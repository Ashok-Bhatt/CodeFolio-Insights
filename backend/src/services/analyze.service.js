import { getStreaksAndActiveDays } from "../utils/calendar.js";
import * as githubScoring from "../utils/scoring/githubScore.js";
import * as githubFetching from "../utils/fetching/githubFetch.js"
import * as scrapeSpideyFetch from "../utils/fetching/scrapeSpideyFetch.js"
import * as leetcodeScoring from "../utils/scoring/leetcodeScore.js";
import { getPdfContent } from "../utils/pdfUtils.js";
import redisClient from "../config/redis.js";
import { getGithubProfileAnalysis, getLeetCodeProfileAnalysis, getResumeAnalysis } from "../utils/geminiUtils.js";
import { getScoreComparison, savePlatformScore } from "./score.service.js";
import scoreModel from "../models/score.model.js";

const getAnalysisGithubData = async (username) => {
    try {
        const userData = await githubFetching.getUserProfileData(username);
        if (!userData) return null;

        const contributionBadges = await githubFetching.getGithubContributionBadges(username);
        if (!contributionBadges) return null;

        const [{ starsCount, forksCount }, pinnedRepos, userRepos, lastYearContributionCalendar, multiYearContributionCalendar, contributionCount, profileReadme, languageStats] = await Promise.all([
            githubFetching.getUserStarsAndForks(username),
            githubFetching.getGithubPinnedRepos(username),
            githubFetching.getUserRepos(username, userData.public_repos),
            githubFetching.getLastYearContributionCalendar(username),
            githubFetching.getMultiYearContributionCalendar(username, new Date(userData.created_at).getFullYear(), new Date().getFullYear()),
            githubFetching.getMultiYearContributionCount(username, new Date(userData.created_at).getFullYear(), new Date().getFullYear()),
            githubFetching.getProfileReadme(username),
            githubFetching.getUserLanguageStats(username),
        ]);

        const { currentStreak, maxStreak, activeDays, totalContributions } = getStreaksAndActiveDays(multiYearContributionCalendar);

        return { userData, starsCount, forksCount, pinnedRepos, userRepos, lastYearContributionCalendar, multiYearContributionCalendar, contributionCount, profileReadme, contributionBadges, languageStats, currentStreak, maxStreak, activeDays, totalContributions };

    } catch (error) {
        console.log("Error occurred while fetching github data for analysis:", error);
        console.log(error.stack);
        return null;
    }
}

const getAnalysisLeetCodeData = async (username) => {
    try {
        const problemsCount = await scrapeSpideyFetch.fetchLeetCodeProblemsCount(username);
        const multiYearSubmissionCalendar = await scrapeSpideyFetch.fetchLeetCodeUserMultiYearSubmissionData(username);
        const submissionCalendar = multiYearSubmissionCalendar[String(new Date().getFullYear())] || {};
        const contestData = await scrapeSpideyFetch.fetchLeetCodeContestData(username);
        const profileInfo = await scrapeSpideyFetch.fetchLeetCodeProfileData(username);
        const badges = await scrapeSpideyFetch.fetchLeetCodeBadgesData(username);
        const topicWiseProblems = await scrapeSpideyFetch.fetchLeetCodeTopicWiseProblemsData(username);

        const acceptanceRate = (problemsCount?.matchedUser?.submitStats?.acSubmissionNum?.[0]?.submissions || 0) / (problemsCount?.matchedUser?.submitStats?.totalSubmissionNum?.[0]?.submissions || 1);

        return { problemsCount, multiYearSubmissionCalendar, submissionCalendar, contestData, profileInfo, badges, topicWiseProblems, acceptanceRate };
    } catch (error) {
        console.log("Error occurred while fetching leetcode data for analysis:", error);
        console.log(error.stack);
        return null;
    }
}

const getGithubScore = async (githubData) => {
    try {
        let score = 0;

        const { userData, starsCount, forksCount, pinnedRepos, lastYearContributionStats, contributionCount, profileReadme, contributionBadges, languageStats, currentStreak, maxStreak, activeDays, totalContributions } = githubData;
        const repoCountScore = githubScoring.getRepoCountScore(userData.public_repos);
        const languagesCountScore = githubScoring.getLanguagesCountScore(Object.entries(languageStats).length);
        const totalCommitsScore = githubScoring.getTotalCommitsScore(contributionCount.commitsCount);
        const pullRequestsCountScore = githubScoring.getPullRequestsCountScore(contributionCount.pullRequestsCount);
        const issuesCountScore = githubScoring.getIssuesCountScore(contributionCount.issuesCount);
        const restrictedContributionCountScore = githubScoring.getRestrictedContributionCountScore(contributionCount.restrictedContributionCount);
        const forksCountScore = githubScoring.getForksCountScore(forksCount);
        const starsCountScore = githubScoring.getStarsCountScore(starsCount);
        const profileReadmeScore = githubScoring.getProfileReadmeScore(profileReadme);
        const pinnedReposScore = githubScoring.getPinnedReposScore(pinnedRepos);
        const streakScore = githubScoring.getStreakScore(maxStreak, currentStreak, activeDays);

        const publicContributionsScore = totalCommitsScore * 0.6 + pullRequestsCountScore * 0.3 + issuesCountScore * 0.1;
        const privateContributionsScore = restrictedContributionCountScore * 0.5 + Math.max(totalCommitsScore, pullRequestsCountScore) * 0.5;
        const contributionsScore = Math.max(publicContributionsScore, privateContributionsScore);

        score = repoCountScore * 0.025 + languagesCountScore * 0.025 + forksCountScore * 0.06 + starsCountScore * 0.09 + profileReadmeScore * 0.05 + pinnedReposScore * 0.05 + streakScore * 0.1 + contributionsScore * 0.6;

        const scoreData = {
            overall: score,
            parameterWise: { repoCountScore, languagesCountScore, forksCountScore, starsCountScore, profileReadmeScore, pinnedReposScore, streakScore, contributionsScore: { overall: contributionsScore, options: { publicContributionsScore, privateContributionsScore }, components: { totalCommitsScore, pullRequestsCountScore, issuesCountScore, restrictedContributionCountScore } } }
        }

        return scoreData;

    } catch (error) {
        console.log("Error occurred while fetching github data for analysis:", error);
        console.log(error.stack);
        return null;
    }
}

const getLeetCodeScore = async (leetcodeData) => {
    try {
        let score = 0;
        const { acceptanceRate, badges, contestData, problemsCount, multiYearSubmissionCalendar } = leetcodeData;

        let acceptanceRateScore = leetcodeScoring.getAcceptanceRateScore(acceptanceRate);
        let badgesScore = leetcodeScoring.getBadgesScore(badges?.matchedUser);
        let contestScore = leetcodeScoring.getContestPerformanceScore(contestData);
        let problemsSolvedScore = leetcodeScoring.getProblemsSolvedCountScore(problemsCount?.matchedUser?.submitStats);
        let submissionConsistencyScore = leetcodeScoring.getSubmissionConsistencyScore(multiYearSubmissionCalendar);

        const contestLessScore = acceptanceRateScore * 0.05 + badgesScore * 0.05 + submissionConsistencyScore * 0.25 + contestScore * 0.15 + problemsSolvedScore * 0.5;
        const contestHeavyScore = acceptanceRateScore * 0.01 + badgesScore * 0.01 + submissionConsistencyScore * 0.04 + contestScore * 0.9 + problemsSolvedScore * 0.04;

        score = Math.max(contestLessScore, contestHeavyScore);

        const scoreData = {
            overall: score,
            parameterWise: { acceptanceRateScore, badgesScore, contestScore, problemsSolvedScore, submissionConsistencyScore },
            categoryWise: { contestLessScore, contestHeavyScore }
        };

        return scoreData;
    } catch (error) {
        console.log("Error occurred while fetching leetcode data for analysis:", error);
        console.log(error.stack);
        return null;
    }
}


const analyzeGithub = async (username) => {
    // Checking if data is cached
    const cachedData = await redisClient.get(`profileAnalysis:github:${username}`);
    if (cachedData) return cachedData;

    // Data Fetching
    const githubData = await getAnalysisGithubData(username);
    if (!githubData) return null;

    // Scoring
    const scoreData = await getGithubScore(githubData);
    if (!scoreData) throw new Error("Something went wrong while scoring github data! Try Again!");

    // Getting AI Analysis on Github Data
    const githubAnalysisContext = { ...githubData, scoreData }
    const profileAnalysis = await getGithubProfileAnalysis(githubAnalysisContext);

    // Saving Score and comparing with the existing score
    await savePlatformScore(scoreData.overall, "Github", username);
    const scoreComparison = await getScoreComparison(scoreData.overall, "Github");

    // Returning the response and saving it in cache
    const response = { ...githubAnalysisContext, profileAnalysis, scoreData, scoreComparison }
    await redisClient.set(`profileAnalysis:github:${username}`, response, { ex: 10 * 60 });

    return response;
};

const analyzeLeetCode = async (username) => {
    // Checking if data is cached
    const cachedData = await redisClient.get(`profileAnalysis:leetcode:${username}`);
    if (cachedData) return cachedData;

    // LeetCode Data Fetching
    const leetCodeData = await getAnalysisLeetCodeData(username);
    if (!leetCodeData) return null;

    // Scoring
    const scoreData = await getLeetCodeScore(leetCodeData);
    if (!scoreData) throw new Error("Something went wrong while scoring leetcode data! Try Again!");

    // Getting AI Analysis on LeetCode Data
    const leetCodeAnalysisContext = { ...leetCodeData, scoreData };
    delete leetCodeAnalysisContext.multiYearSubmissionCalendar;
    const profileAnalysis = await getLeetCodeProfileAnalysis(leetCodeAnalysisContext);

    // Saving Score and comparing with the existing score
    await savePlatformScore(scoreData.overall, "Leetcode", username);
    const scoreComparison = await getScoreComparison(scoreData.overall, "Leetcode");

    // Returning the response and saving it in cache
    const response = { ...leetCodeData, profileAnalysis, scoreData, scoreComparison }
    await redisClient.set(`profileAnalysis:leetcode:${username}`, response, { ex: 10 * 60 });

    return response;
};

const analyzeResume = async (file, experienceInYears = "0 - 2 Years (New Grad)", jobDescription = "", userId = null) => {
    // Extracting the PDF Content
    const { noOfPages, pdfText } = await getPdfContent(file.path);
    if (noOfPages == 0) throw new Error("Something went wrong while parsing pdf content! Try Again!");

    // Getting AI Analysis on Resume Data
    const resumeAnalysis = await getResumeAnalysis({ resumeContent: pdfText, experienceInYears, noOfResumePages: noOfPages, jobDescription: jobDescription });

    if (!resumeAnalysis || Object.keys(resumeAnalysis).length == 0) throw new Error("Something Went Wrong while analyzing the resume");

    // Scoring Logic
    const scoreAnalysis = resumeAnalysis["scoreAnalysis"];

    const resumeScoringWeights = {
        PROFESSIONALISM: 0.1,
        IMPACT: 0.1,
        ACHIEVEMENT: 0.15,
        COURSEWORK: 0.05,
        EDUCATION: (experienceInYears < 2) ? 0.1 : 0.05,
        EXPERIENCE: (experienceInYears < 2) ? 0.15 : 0.275,
        CONTACT: 0.05,
        PROJECT: (experienceInYears < 2) ? 0.2 : 0.125,
        TECHNICAL_SKILLS: 0.1,
    }

    const resumeScoringMultiplierWeights = {
        LOGICAL_FLOW: 0.4,
        RESUME_LENGTH: 0.6,
    }

    const professionalismScore = scoreAnalysis["professionalism"]["score"];
    const logicalFlowScore = scoreAnalysis["logicalFlow"]["score"];
    const resumeLengthScore = scoreAnalysis["resumeLength"]["score"];
    const impactScore = scoreAnalysis["impact"]["score"];
    const achievementScore = scoreAnalysis["section"]["achievements"]["score"];
    const courseworkScore = scoreAnalysis["section"]["coursework"]["score"];
    const educationScore = scoreAnalysis["section"]["education"]["score"];
    const experienceScore = scoreAnalysis["section"]["experience"]["score"];
    const contactScore = scoreAnalysis["section"]["contact"]["score"];
    const projectsScore = scoreAnalysis["section"]["projects"]["score"];
    const technicalSkillsScore = scoreAnalysis["section"]["technicalSkills"]["score"];
    const jobDescriptionScore = scoreAnalysis["jobDescription"]["score"];

    const baseScore = (professionalismScore * resumeScoringWeights.PROFESSIONALISM + contactScore * resumeScoringWeights.CONTACT + achievementScore * resumeScoringWeights.ACHIEVEMENT + courseworkScore * resumeScoringWeights.COURSEWORK + educationScore * resumeScoringWeights.EDUCATION + experienceScore * resumeScoringWeights.EXPERIENCE + projectsScore * resumeScoringWeights.PROJECT + technicalSkillsScore * resumeScoringWeights.TECHNICAL_SKILLS + impactScore * resumeScoringWeights.IMPACT);

    const scoreMultiplier = (logicalFlowScore * resumeScoringMultiplierWeights.LOGICAL_FLOW + resumeLengthScore * resumeScoringMultiplierWeights.RESUME_LENGTH) / 100;
    const jobDescriptionMatchMultiplier = jobDescriptionScore / 100;

    const score = baseScore * scoreMultiplier * jobDescriptionMatchMultiplier;
    resumeAnalysis["score"] = score;

    // Saving Score and comparing
    const platform = resumeAnalysis?.scoreAnalysis?.jobDescription?.isJobDescriptionGiven ? "Resume with JD" : "Generic Resume";

    try {
        await scoreModel.create({ userId, score: score, platform });
    } catch (error) {
        console.log('Failed to save resume score:', error.message);
    }
    const scoreComparison = await getScoreComparison(score, platform);

    return { resumeAnalysis, scoreComparison };
};

export {
    getAnalysisGithubData,
    getAnalysisLeetCodeData,
    getGithubScore,
    getLeetCodeScore,
    analyzeGithub,
    analyzeLeetCode,
    analyzeResume
}
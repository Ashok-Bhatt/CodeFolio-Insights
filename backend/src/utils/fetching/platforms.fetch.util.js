import * as gfgService from '../../services/platforms/gfg.service.js';
import * as codeChefService from '../../services/platforms/codechef.service.js';
import * as interviewbitService from '../../services/platforms/interviewbit.service.js';
import * as code360Service from '../../services/platforms/code360.service.js';
import * as leetcodeService from '../../services/platforms/leetcode.service.js';
import * as hackerrankService from '../../services/platforms/hackerrank.service.js';
import * as githubFetching from './github.fetch.util.js';

const fetchMultiYearSubmissionData = async (username, startYear, fetchFunction) => {
    const currentYear = new Date().getFullYear();
    const submissionData = {};
    for (let year = startYear; year <= currentYear; year++) {
        try {
            submissionData[year] = await fetchFunction(username, year);
        } catch (error) {
            console.error(`Error fetching data for year ${year}:`, error.message);
            submissionData[year] = null;
        }
    }
    return submissionData;
};

const fetchGfgData = async (username, year = null) => {
    return {
        profile: await gfgService.getUserInfo(username),
        submission: year
            ? { [year]: await gfgService.getUserSubmissions(username, year) }
            : await fetchMultiYearSubmissionData(username, 2016, gfgService.getUserSubmissions),
    }
}

const fetchCodeChefData = async (username) => {
    return {
        profile: await codeChefService.getUserInfo(username, true, true),
        submission: await codeChefService.getUserSubmissions(username),
    }
}

const fetchInterviewbitData = async (username, year = null) => {
    return {
        profile: await interviewbitService.getUserInfo(username, true, true),
        badges: await interviewbitService.getUserBadges(username),
        submission: year
            ? { [year]: await interviewbitService.getUserSubmissions(username, year) }
            : await fetchMultiYearSubmissionData(username, 2015, interviewbitService.getUserSubmissions),
    }
}

const fetchCode360Data = async (username, year = null) => {
    return {
        profile: await code360Service.getUserInfo(username, true),
        submission: year
            ? { [year]: await code360Service.getUserSubmissions(username, year) }
            : await fetchMultiYearSubmissionData(username, 2020, code360Service.getUserSubmissions),
    }
}

const fetchLeetCodeData = async (username, year = null) => {
    const sessionProgress = await leetcodeService.getUserSessionProgress(username);
    return {
        profile: await leetcodeService.getUserProfile(username),
        badges: await leetcodeService.getUserBadges(username),
        contest: await leetcodeService.getContestRanking(username),
        problems: sessionProgress?.userStats,
        submission: year
            ? { [year]: await leetcodeService.getUserCalendar(username, year) }
            : await fetchMultiYearSubmissionData(username, 2015, leetcodeService.getUserCalendar),
        topicStats: await leetcodeService.getSkillStats(username),
    }
}

const fetchHackerRankData = async (username) => {
    return {
        profile: await hackerrankService.getUserInfo(username),
    }
}

const fetchGitHubData = async (username) => {

    const profileData = await githubFetching.getUserProfileData(username);

    return {
        profile: profileData,
        contributions: profileData?.created_at ? await githubFetching.getMultiYearContributionCount(username, new Date(profileData.created_at).getFullYear(), new Date().getFullYear()) : null,
        calendar: profileData?.created_at ? await githubFetching.getMultiYearContributionCalendar(username, new Date(profileData.created_at).getFullYear(), new Date().getFullYear()) : null,
        badges: await githubFetching.getGithubContributionBadges(username),
        languageStats: await githubFetching.getUserLanguageStats(username),
        starsAndForks: await githubFetching.getUserStarsAndForks(username),
    }
}

export {
    fetchGfgData,
    fetchCodeChefData,
    fetchInterviewbitData,
    fetchCode360Data,
    fetchLeetCodeData,
    fetchHackerRankData,
    fetchGitHubData
};

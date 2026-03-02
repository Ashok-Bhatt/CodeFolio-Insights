import * as scrapeSpideyFetching from './scrapeSpideyFetch.js';
import * as githubFetching from './githubFetch.js';

const fetchGfgData = async (username, year = null) => {
    return {
        profile: await scrapeSpideyFetching.fetchGfgUserData(username),
        submission: year
            ? { [year]: await scrapeSpideyFetching.fetchGfgUserSubmissionData(username, year) }
            : await scrapeSpideyFetching.fetchGfgUserMultiYearSubmissionData(username),
    }
}

const fetchCodeChefData = async (username) => {
    return {
        profile: await scrapeSpideyFetching.fetchCodeChefUserData(username),
        submission: await scrapeSpideyFetching.fetchCodeChefUserSubmissionData(username),
    }
}

const fetchInterviewbitData = async (username, year = null) => {
    return {
        profile: await scrapeSpideyFetching.fetchInterviewbitUserData(username),
        badges: await scrapeSpideyFetching.fetchInterviewbitBadgesData(username),
        submission: year
            ? { [year]: await scrapeSpideyFetching.fetchInterviewbitUserSubmissionData(username, year) }
            : await scrapeSpideyFetching.fetchInterviewbitUserMultiYearSubmissionData(username),
    }
}

const fetchCode360Data = async (username, year = null) => {
    return {
        profile: await scrapeSpideyFetching.fetchCode360UserData(username),
        submission: year
            ? { [year]: await scrapeSpideyFetching.fetchCode360UserSubmissionData(username, year) }
            : await scrapeSpideyFetching.fetchCode360UserMultiYearSubmissionData(username),
    }
}

const fetchLeetCodeData = async (username, year = null) => {
    return {
        profile: (await scrapeSpideyFetching.fetchLeetCodeProfileData(username))?.matchedUser,
        badges: (await scrapeSpideyFetching.fetchLeetCodeBadgesData(username))?.matchedUser,
        contest: await scrapeSpideyFetching.fetchLeetCodeContestData(username),
        problems: (await scrapeSpideyFetching.fetchLeetCodeProblemsCount(username))?.matchedUser?.submitStats,
        submission: year
            ? { [year]: (await scrapeSpideyFetching.fetchLeetCodeUserSubmissionData(username, year))?.matchedUser?.userCalendar?.submissionCalendar }
            : await scrapeSpideyFetching.fetchLeetCodeUserMultiYearSubmissionData(username),
        topicStats: (await scrapeSpideyFetching.fetchLeetCodeTopicWiseProblemsData(username))?.matchedUser?.tagProblemCounts,
    }
}

const fetchHackerRankData = async (username) => {
    return {
        profile: await scrapeSpideyFetching.fetchHackerRankUserData(username),
    }
}

const fetchGitHubData = async (username) => {

    const profileData = await githubFetching.getUserProfileData(username);

    return {
        profile: profileData,
        contributions: profileData?.created_at ? await githubFetching.getMultiYearContributionCount(username, new Date(profileData.created_at).getFullYear(), new Date().getFullYear()) : null,
        calendar: profileData?.created_at ? await githubFetching.getMultiYearContributionCalendar(username, new Date(profileData.created_at).getFullYear(), new Date().getFullYear()) : null,
        badges: await githubFetching.getGithubContributionBadges(username),
        languageStats: await githubFetching.getUserLanguageStats(username)
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
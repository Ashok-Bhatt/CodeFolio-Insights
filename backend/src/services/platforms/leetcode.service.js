import axios from "axios";
import { LEETCODE_GRAPHQL_ENDPOINT, LEETCODE_GRAPHQL_QUERIES } from "../../constants/platforms/leetcode.constants.js";
import { getNormalizedLeetCodeHeatmap } from "../../utils/calendar.util.js";

const makeApiCall = async (query, variables = {}) => {
    try {
        const { data } = await axios.post(
            LEETCODE_GRAPHQL_ENDPOINT,
            { query, variables },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Referer": "https://leetcode.com/",
                    "Origin": "https://leetcode.com/",
                    "User-Agent": "Mozilla/5.0",
                },
                timeout: 30000,
            }
        );
        return data.data;
    } catch (error) {
        console.error("LeetCode Request Error: ", error.message);
        return null;
    }
};

const getUserProfile = async (username) => {
    return await makeApiCall(LEETCODE_GRAPHQL_QUERIES.userProfile, { username });
};

const getLanguageStats = async (username) => {
    return await makeApiCall(LEETCODE_GRAPHQL_QUERIES.userLanguageStats, { username });
};

const getUserCalendar = async (username, year) => {
    const data = await makeApiCall(LEETCODE_GRAPHQL_QUERIES.userProfileCalendar, { username, year });
    if (data?.["matchedUser"]?.["userCalendar"]?.["submissionCalendar"]) {
        data["matchedUser"]["userCalendar"]["submissionCalendar"] = getNormalizedLeetCodeHeatmap(
            JSON.parse(data["matchedUser"]["userCalendar"]["submissionCalendar"]),
            year
        );
    }
    return data;
};

const getRecentAcSubmissions = async (username, limit = 10) => {
    return await makeApiCall(LEETCODE_GRAPHQL_QUERIES.recentAcSubmissions, { username, limit });
};

const getUserBadges = async (username) => {
    const data = await makeApiCall(LEETCODE_GRAPHQL_QUERIES.userBadges, { username });
    data?.["matchedUser"]?.["badges"]?.forEach((badge) => {
        if (badge["icon"] && !badge["icon"].startsWith("http")) {
            badge["icon"] = "https://leetcode.com" + badge["icon"];
        }
    });
    return data;
};

const getContestRanking = async (username) => {
    return await makeApiCall(LEETCODE_GRAPHQL_QUERIES.userContestRankings, { username });
};

const getSkillStats = async (username) => {
    return await makeApiCall(LEETCODE_GRAPHQL_QUERIES.skillStats, { username });
};

const getQuestionOfToday = async () => {
    return await makeApiCall(LEETCODE_GRAPHQL_QUERIES.questionOfToday, {});
};

const getUpcomingContests = async () => {
    return await makeApiCall(LEETCODE_GRAPHQL_QUERIES.upcomingContests, {});
};

const getGlobalTopRankers = async (page = 1) => {
    return await makeApiCall(LEETCODE_GRAPHQL_QUERIES.globalTopRankers, { page });
};

const getUserProfileQuestionProgressV2 = async (userSlug) => {
    return await makeApiCall(LEETCODE_GRAPHQL_QUERIES.userProfileUserQuestionProgressV2, { userSlug });
};

const getUserSessionProgress = async (username) => {
    return await makeApiCall(LEETCODE_GRAPHQL_QUERIES.userSessionProgress, { username });
};

const getContestRatingHistogram = async () => {
    return await makeApiCall(LEETCODE_GRAPHQL_QUERIES.contestRatingHistogram, {});
};

const getCodingChallengeMedal = async (year, month) => {
    return await makeApiCall(LEETCODE_GRAPHQL_QUERIES.codingChallengeMedal, { year, month });
};

export {
    getUserProfile,
    getLanguageStats,
    getUserCalendar,
    getRecentAcSubmissions,
    getUserBadges,
    getContestRanking,
    getSkillStats,
    getUserProfileQuestionProgressV2,
    getUserSessionProgress,
    getContestRatingHistogram,
    getQuestionOfToday,
    getCodingChallengeMedal,
    getUpcomingContests,
    getGlobalTopRankers,
};

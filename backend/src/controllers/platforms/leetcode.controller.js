import * as LeetCodeService from "../../services/platforms/leetcode.service.js";

const getUserProfile = async (req, res) => {
    try {
        const { user } = req.query;
        if (!user) return res.status(400).json({ message: "Username is required" });
        const data = await LeetCodeService.getUserProfile(user);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserCalendar = async (req, res) => {
    try {
        const { user, year } = req.query;
        if (!user) return res.status(400).json({ message: "Username is required" });
        const targetYear = parseInt(year) || new Date().getFullYear();
        const data = await LeetCodeService.getUserCalendar(user, targetYear);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserBadges = async (req, res) => {
    try {
        const { user } = req.query;
        if (!user) return res.status(400).json({ message: "Username is required" });
        const data = await LeetCodeService.getUserBadges(user);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getContestRanking = async (req, res) => {
    try {
        const { user } = req.query;
        if (!user) return res.status(400).json({ message: "Username is required" });
        const data = await LeetCodeService.getContestRanking(user);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getQuestionOfToday = async (req, res) => {
    try {
        const data = await LeetCodeService.getQuestionOfToday();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUpcomingContests = async (req, res) => {
    try {
        const data = await LeetCodeService.getUpcomingContests();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getGlobalTopRankers = async (req, res) => {
    try {
        const { page } = req.query;
        const pageNum = parseInt(page) || 1;
        const data = await LeetCodeService.getGlobalTopRankers(pageNum);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getLanguageStats = async (req, res) => {
    try {
        const { user } = req.query;
        if (!user) return res.status(400).json({ message: "Username is required" });
        const data = await LeetCodeService.getLanguageStats(user);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getRecentAcSubmissions = async (req, res) => {
    try {
        const { user, limit } = req.query;
        if (!user) return res.status(400).json({ message: "Username is required" });
        const queryLimit = parseInt(limit) || 10;
        const data = await LeetCodeService.getRecentAcSubmissions(user, queryLimit);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getSkillStats = async (req, res) => {
    try {
        const { user } = req.query;
        if (!user) return res.status(400).json({ message: "Username is required" });
        const data = await LeetCodeService.getSkillStats(user);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserProfileQuestionProgressV2 = async (req, res) => {
    try {
        const { userSlug, user } = req.query;
        const slug = userSlug || user;
        if (!slug) return res.status(400).json({ message: "userSlug or user is required" });
        const data = await LeetCodeService.getUserProfileQuestionProgressV2(slug);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserSessionProgress = async (req, res) => {
    try {
        const { user } = req.query;
        if (!user) return res.status(400).json({ message: "Username is required" });
        const data = await LeetCodeService.getUserSessionProgress(user);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getContestRatingHistogram = async (req, res) => {
    try {
        const data = await LeetCodeService.getContestRatingHistogram();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCodingChallengeMedal = async (req, res) => {
    try {
        const { year, month } = req.query;
        const targetYear = parseInt(year);
        const targetMonth = parseInt(month);
        if (Number.isNaN(targetYear) || Number.isNaN(targetMonth)) {
            return res.status(400).json({ message: "year and month query params are required and must be integers" });
        }
        const data = await LeetCodeService.getCodingChallengeMedal(targetYear, targetMonth);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCreatedPublicFavoriteList = async (req, res) => {
    try {
        const { userSlug, user } = req.query;
        const slug = userSlug || user;
        if (!slug) return res.status(400).json({ message: "userSlug or user is required" });
        const data = await LeetCodeService.getCreatedPublicFavoriteList(slug);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
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
    getCreatedPublicFavoriteList,
};

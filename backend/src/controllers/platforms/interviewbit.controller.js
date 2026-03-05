import * as InterviewBitService from "../../services/platforms/interviewbit.service.js";

const getUserInfo = async (req, res) => {
    try {
        const { user } = req.query;
        if (!user) return res.status(400).json({ message: "Username is required" });
        const data = await InterviewBitService.getUserInfo(user);
        res.status(200).json(data);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "Failed to fetch InterviewBit user info" });
    }
};

const getUserSubmissions = async (req, res) => {
    try {
        const { user, year } = req.query;
        if (!user) return res.status(400).json({ message: "Username is required" });
        const targetYear = parseInt(year) || new Date().getFullYear();
        const data = await InterviewBitService.getUserSubmissions(user, targetYear);
        res.status(200).json(data);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "Failed to fetch InterviewBit user submissions" });
    }
};

const getUserBadges = async (req, res) => {
    try {
        const { user } = req.query;
        if (!user) return res.status(400).json({ message: "Username is required" });
        const data = await InterviewBitService.getUserBadges(user);
        res.status(200).json(data);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "Failed to fetch InterviewBit user badges" });
    }
};

export {
    getUserInfo,
    getUserSubmissions,
    getUserBadges,
};

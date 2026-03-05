import * as HackerRankService from "../../services/platforms/hackerrank.service.js";

const getUserInfo = async (req, res) => {
    try {
        const { user } = req.query;
        if (!user) return res.status(400).json({ message: "Username is required" });
        const data = await HackerRankService.getUserInfo(user);
        res.status(200).json(data);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "Failed to fetch HackerRank user info" });
    }
};

export {
    getUserInfo,
};

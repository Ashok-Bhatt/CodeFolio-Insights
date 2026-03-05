import * as Code360Service from "../../services/platforms/code360.service.js";

const getUserInfo = async (req, res) => {
    try {
        const { user, includeContests } = req.query;
        if (!user) return res.status(400).json({ message: "Username is required" });
        const data = await Code360Service.getUserInfo(user, includeContests === 'true');
        res.status(200).json(data);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "Failed to fetch Code360 user info" });
    }
};

const getUserSubmissions = async (req, res) => {
    try {
        const { user, year } = req.query;
        if (!user) return res.status(400).json({ message: "Username is required" });
        const targetYear = parseInt(year) || new Date().getFullYear();
        const data = await Code360Service.getUserSubmissions(user, targetYear);
        res.status(200).json(data);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "Failed to fetch Code360 user submissions" });
    }
};

export {
    getUserInfo,
    getUserSubmissions,
};

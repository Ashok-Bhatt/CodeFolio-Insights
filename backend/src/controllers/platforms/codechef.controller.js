import * as CodeChefService from "../../services/platforms/codechef.service.js";

const getUserInfo = async (req, res) => {
    try {
        const { user, includeAchievements } = req.query;
        if (!user) return res.status(400).json({ message: "Username is required" });
        const data = await CodeChefService.getUserInfo(user, includeAchievements);
        res.status(200).json(data);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "Failed to fetch CodeChef user info" });
    }
};

const getUserSubmissions = async (req, res) => {
    try {
        const { user } = req.query;
        if (!user) return res.status(400).json({ message: "Username is required" });
        const data = await CodeChefService.getUserSubmissions(user);
        res.status(200).json(data);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "Failed to fetch CodeChef user submissions" });
    }
};

export {
    getUserInfo,
    getUserSubmissions,
};

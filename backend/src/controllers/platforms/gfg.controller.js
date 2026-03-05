import * as GfgService from "../../services/platforms/gfg.service.js";

const getUserInfo = async (req, res) => {
    try {
        const { user } = req.query;
        if (!user) return res.status(400).json({ message: "Username is required" });
        const data = await GfgService.getUserInfo(user);
        res.status(200).json(data);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "Failed to fetch GFG user info" });
    }
};

const getUserSubmissions = async (req, res) => {
    try {
        const { user, year } = req.query;
        if (!user) return res.status(400).json({ message: "Username is required" });
        const targetYear = parseInt(year) || new Date().getFullYear();
        const data = await GfgService.getUserSubmissions(user, targetYear);
        res.status(200).json(data);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "Failed to fetch GFG user submissions" });
    }
};

const getQuestionOfToday = async (req, res) => {
    try {
        const data = await GfgService.getQuestionOfToday();
        res.status(200).json(data);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "Failed to fetch GFG question of today" });
    }
};

const getUserProblemsSolved = async (req, res) => {
    try {
        const { user } = req.query;
        if (!user) return res.status(400).json({ message: "Username is required" });
        const data = await GfgService.getUserProblemsSolved(user);
        res.status(200).json(data);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "Failed to fetch GFG user problems solved" });
    }
};

const getInstitutionTopThreeRankedUsers = async (req, res) => {
    try {
        const { institution } = req.query;
        if (!institution) return res.status(400).json({ message: "Institution name is required" });
        const data = await GfgService.getInstitutionTopThreeRankedUsers(institution);
        res.status(200).json(data);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "Failed to fetch GFG institution ranked users" });
    }
};

const getInstitutionInfo = async (req, res) => {
    try {
        const { institution } = req.query;
        if (!institution) return res.status(400).json({ message: "Institution name is required" });
        const data = await GfgService.getInstitutionInfo(institution);
        res.status(200).json(data);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "Failed to fetch GFG institution info" });
    }
};

const getMonthlyPotds = async (req, res) => {
    try {
        const { year, month } = req.query;
        const targetYear = parseInt(year) || new Date().getFullYear();
        const targetMonth = parseInt(month) || new Date().getMonth() + 1;
        const data = await GfgService.getMonthlyPotds(targetYear, targetMonth);
        res.status(200).json(data);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "Failed to fetch GFG monthly POTDs" });
    }
};

export {
    getUserInfo,
    getUserSubmissions,
    getQuestionOfToday,
    getUserProblemsSolved,
    getInstitutionTopThreeRankedUsers,
    getInstitutionInfo,
    getMonthlyPotds,
};

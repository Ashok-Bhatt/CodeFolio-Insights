import * as GithubService from "../../services/platforms/github.service.js";

const getGithubBadges = async (req, res) => {
    try {
        const { user } = req.query;
        if (!user) return res.status(400).json({ message: "Username is required" });
        const data = await GithubService.getGithubBadges(user);
        res.status(200).json(data);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "Failed to fetch GitHub badges" });
    }
};

export {
    getGithubBadges,
};

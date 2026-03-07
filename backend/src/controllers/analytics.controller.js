import ApiPointsModel from "../models/api-points.model.js";
import ApiLogsModel from "../models/api-logs.js";
import ApiProjectModel from "../models/api-project.model.js";
import asyncHandler from "../utils/async-handler.util.js";

const getDailyApiUsageData = asyncHandler(async (req, res) => {
    const { apiKey } = req.query;
    if (!apiKey) return res.status(400).json({ message: "API Key not provided" });

    const project = await ApiProjectModel.findOne({ apiKey });
    if (!project) return res.status(400).json({ message: "Project not found or invalid API Key" });

    if (project.userId.toString() !== req.user._id.toString()) return res.status(403).json({ message: "Unauthorized access to this project" });

    const lastDays = req.query.lastDays || 1;

    if (lastDays > 30) return res.status(400).json({ message: "Too long history not allowed" });

    const today = new Date();
    const dailyUsageData = [];

    for (let i = 0; i < lastDays; i++) {
        const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
        const dateData = await ApiPointsModel.findOne({ apiKey, date });
        if (dateData) {
            dailyUsageData.push(dateData);
        } else {
            const newDateData = await ApiPointsModel.create({
                apiKey,
                date,
                apiPointsUsed: 0,
                requestsMade: 0,
            })
            dailyUsageData.push(newDateData);
        }
    }

    return res.status(200).json(dailyUsageData);
});

const getApiRequestsData = asyncHandler(async (req, res) => {
    const { apiKey } = req.query;
    if (!apiKey) return res.status(400).json({ message: "API Key not provided" });

    const project = await ApiProjectModel.findOne({ apiKey });
    if (!project) return res.status(400).json({ message: "Project not found or invalid API Key" });

    if (project.userId.toString() !== req.user._id.toString()) return res.status(403).json({ message: "Unauthorized access to this project" });

    const previousInterval = parseInt(req.query.previousInterval) || 30 * 60 * 1000;

    // only last 30 days data fetching allowed
    if (previousInterval > 30 * 24 * 60 * 60 * 1000) return res.status(400).json({ message: "Too long history not allowed" });

    const intervalEnding = Date.now();
    const intervalStarting = intervalEnding - previousInterval;

    let requestsData = await ApiLogsModel.find({ apiKey, createdAt: { $gt: new Date(intervalStarting), $lt: new Date(intervalEnding) }, endpoint: { $not: /^\/api\/v1\/analytics/ } });
    return res.status(200).json(requestsData);
});

export {
    getDailyApiUsageData,
    getApiRequestsData,
}

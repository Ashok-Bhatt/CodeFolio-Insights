import ApiProjectModel from "../models/api-project.model.js";
import ApiPointsModel from "../models/api-points.model.js";
import ApiLogsModel from "../models/api-logs.model.js";
import { publicEndpointsRegex } from "../constants/regex.constants.js";

const getDailyApiUsageData = async (apiKey, lastDays) => {
    const project = await ApiProjectModel.findOne({ apiKey });
    if (!project) throw new Error("Project not found or invalid API Key");
    if (project.userId.toString() !== req.user._id.toString()) throw new Error("Unauthorized access to this project");

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

    return dailyUsageData;
}

const getPublicApiRequestsData = async (apiKey, previousInterval) => {
    const project = await ApiProjectModel.findOne({ apiKey });
    if (!project) throw Error("Project not found or invalid API Key");
    if (project.userId.toString() !== req.user._id.toString()) throw Error("Unauthorized access to this project");

    const intervalEnding = Date.now();
    const intervalStarting = intervalEnding - previousInterval;

    let requestsData = await ApiLogsModel.find({ apiKey, createdAt: { $gt: new Date(intervalStarting), $lt: new Date(intervalEnding) }, endpoint: { $regex: publicEndpointsRegex } });
    return requestsData;
}

export {
    getDailyApiUsageData,
    getPublicApiRequestsData,
}
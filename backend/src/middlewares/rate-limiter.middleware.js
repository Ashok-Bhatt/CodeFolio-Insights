import ApiPointsModel from "../models/api-points.model.js";
import ApiProjectModel from "../models/api-project.model.js";
import { getApiCost } from "../utils/api-cost.util.js";
import asyncHandler from "../utils/async-handler.util.js";
import rateLimit from "express-rate-limit";

const publicApiRateLimiter = asyncHandler(async (req, res, next) => {
    const { apiKey } = req.query;
    if (!apiKey) return res.status(401).json({ message: "API Key required" });

    const project = await ApiProjectModel.findOne({ apiKey });
    if (!project) return res.status(401).json({ message: "Invalid API Key" });

    const apiCost = getApiCost(req.originalUrl);
    const date = new Date().toISOString().split("T")[0];

    let apiPoint = await ApiPointsModel.findOne({ apiKey, date });

    if (!apiPoint) {
        apiPoint = await ApiPointsModel.create({
            apiKey,
            date,
            apiPointsUsed: apiCost,
            requestsMade: 1,
        })

        if (!apiPoint) return res.status(400).json({ message: "Something went wrong!" });
        next();
    } else if (apiPoint.apiPointsUsed >= project.apiPointsDailyLimit) {
        return res.status(429).json({ message: "Rate limit exceeded" });
    } else {
        apiPoint.apiPointsUsed += apiCost;
        apiPoint.requestsMade += 1;
        await apiPoint.save();
        next();
    }
});

const loginRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 login requests per window
    message: { message: "Too many login attempts, please try again after 15 minutes" },
    standardHeaders: true,
    legacyHeaders: false,
});

export {
    publicApiRateLimiter,
    loginRateLimiter,
}

import ApiProjectModel from "../models/api-project.model.js";
import asyncHandler from "../utils/async-handler.util.js";

const verifyApiKey = asyncHandler(async (req, res, next) => {
    const apiKey = req.query.apiKey || "";
    if (!apiKey) return res.status(401).json({ message: "API Key is required!" });

    const project = await ApiProjectModel.findOne({ apiKey });
    if (!project) return res.status(401).json({ message: "Invalid API Key!" });

    req.apiKey = project.apiKey;
    req.apiPointsDailyLimit = project.apiPointsDailyLimit;
    next();
});

export {
    verifyApiKey,
}

import asyncHandler from "../utils/async-handler.util.js";
import * as analyticsService from "../services/analytics.service.js"

const getDailyApiUsageData = asyncHandler(async (req, res) => {
    const { apiKey, lastDays } = req.query;
    const result = analyticsService.getDailyApiUsageData(apiKey, lastDays)
    return res.status(200).json(result);
});

const getPublicApiRequestsData = asyncHandler(async (req, res) => {
    const { apiKey, previousInterval } = req.query;
    const result = analyticsService.getPublicApiRequestsData(apiKey, previousInterval)
    return res.status(200).json(result);
});

export {
    getDailyApiUsageData,
    getPublicApiRequestsData,
}

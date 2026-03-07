import express from 'express';
import { getDailyApiUsageData, getApiRequestsData } from '../controllers/analytics.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';
import { getAnalytics } from '../middlewares/analytics.middleware.js';

const router = express.Router();

router.get(
    "/daily-usage", 
    getAnalytics, 
    protectRoute, 
    getDailyApiUsageData
);

router.get(
    "/api-requests-data", 
    getAnalytics, 
    protectRoute, 
    getApiRequestsData
);

export default router;

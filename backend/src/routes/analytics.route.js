import express from 'express';
import { getDailyApiUsageData, getPublicApiRequestsData } from '../controllers/analytics.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';
import { getAnalytics } from '../middlewares/analytics.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { apiKeyDailyUsageValidationSchema, apiKeyRequestsDataValidationSchema } from '../validators/analytics.validate.js';

const router = express.Router();

router.get(
    "/daily-usage",
    getAnalytics,
    protectRoute,
    validate(apiKeyDailyUsageValidationSchema),
    getDailyApiUsageData
);

router.get(
    "/api-requests-data",
    getAnalytics,
    protectRoute,
    validate(apiKeyRequestsDataValidationSchema),
    getPublicApiRequestsData
);

export default router;

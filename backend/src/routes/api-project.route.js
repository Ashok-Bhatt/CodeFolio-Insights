import express from 'express';
import { getProjects, getProjectById, createProject, updateProject, deleteProject, changeDailyApiLimit, getUserProjects } from '../controllers/api-project.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';
import { checkAdmin } from '../middlewares/admin.middleware.js';
import { getAnalytics } from '../middlewares/analytics.middleware.js';
import validate from '../middlewares/validate.middleware.js';
import { projectIdAndNameBodySchema, projectIdValidationSchema, projectNameBodySchema, apiKeyPointsLimitValidationSchema } from "../validators/api-project.validate.js"

const router = express.Router();

router.get(
    "/all", 
    getAnalytics, 
    protectRoute, 
    getProjects
);

router.get(
    "/:projectId", 
    getAnalytics, 
    protectRoute, 
    validate(projectIdValidationSchema),
    getProjectById
);

router.post(
    "/", 
    getAnalytics, 
    protectRoute, 
    validate(projectNameBodySchema),
    createProject
);

router.put(
    "/", 
    getAnalytics, 
    protectRoute, 
    validate(projectIdAndNameBodySchema),
    updateProject
);

router.delete(
    "/:projectId", 
    getAnalytics, 
    protectRoute, 
    validate(projectIdValidationSchema),
    deleteProject
);

// Admin Routes
router.patch(
    "/daily-api-limit", 
    getAnalytics, 
    protectRoute, 
    checkAdmin, 
    validate(apiKeyPointsLimitValidationSchema),
    changeDailyApiLimit
);

router.get(
    "/all/:userId", 
    getAnalytics, 
    protectRoute, 
    checkAdmin, 
    validate(projectIdValidationSchema),
    getUserProjects
);

export default router;

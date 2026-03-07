import express from 'express';
import { getProjects, getProjectById, createProject, updateProject, deleteProject, changeDailyApiLimit, getUserProjects } from '../controllers/api-project.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';
import { checkAdmin } from '../middlewares/admin.middleware.js';
import { getAnalytics } from '../middlewares/analytics.middleware.js';

const router = express.Router();

router.get(
    "/all", 
    getAnalytics, 
    protectRoute, 
    getProjects
);

router.get(
    "/:id", 
    getAnalytics, 
    protectRoute, 
    getProjectById
);

router.post(
    "/", 
    getAnalytics, 
    protectRoute, 
    createProject
);

router.put(
    "/:id", 
    getAnalytics, 
    protectRoute, 
    updateProject
);

router.delete(
    "/:id", 
    getAnalytics, 
    protectRoute, 
    deleteProject
);

// Admin Routes
router.patch(
    "/daily-api-limit", 
    getAnalytics, 
    protectRoute, 
    checkAdmin, 
    changeDailyApiLimit
);

router.get(
    "/all/:userId", 
    getAnalytics, 
    protectRoute, 
    checkAdmin, 
    getUserProjects
);

export default router;

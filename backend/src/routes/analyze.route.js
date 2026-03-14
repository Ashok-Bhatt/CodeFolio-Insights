import express from "express";
import { analyzeGithub, analyzeLeetCode, analyzeResume } from "../controllers/analyze.controller.js";
import { optionalAuth } from "../middlewares/auth.middleware.js";
import { getAnalytics } from "../middlewares/analytics.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import { usernameValidationSchema } from "../validators/user.validate.js";
import { resumeAnalyzerValidationSchema } from "../validators/analyzer.validate.js";
import upload from "../middlewares/multer.middleware.js";

const router = express.Router();

router.get(
    "/github",
    getAnalytics,
    optionalAuth,
    validate(usernameValidationSchema),
    analyzeGithub
);

router.get(
    "/leetcode",
    getAnalytics, 
    optionalAuth,
    validate(usernameValidationSchema), 
    analyzeLeetCode
);

router.post(
    "/resume", 
    getAnalytics, 
    optionalAuth, 
    upload.single("resume"), 
    validate(resumeAnalyzerValidationSchema), 
    analyzeResume
);

export default router;

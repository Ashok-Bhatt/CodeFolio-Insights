import express from "express";
import * as InterviewBitController from "../../controllers/platforms/interviewbit.controller.js";

const router = express.Router();

router.get("/user/profile", InterviewBitController.getUserInfo);
router.get("/user/submissions", InterviewBitController.getUserSubmissions);
router.get("/user/badges", InterviewBitController.getUserBadges);

export default router;

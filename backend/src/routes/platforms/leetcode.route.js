import express from "express";
import * as LeetCodeController from "../../controllers/platforms/leetcode.controller.js";

const router = express.Router();

router.get("/user/profile", LeetCodeController.getUserProfile);
router.get("/user/language-stats", LeetCodeController.getLanguageStats);
router.get("/user/calendar", LeetCodeController.getUserCalendar);
router.get("/user/recent-ac-submissions", LeetCodeController.getRecentAcSubmissions);
router.get("/user/badges", LeetCodeController.getUserBadges);
router.get("/user/contest-ranking", LeetCodeController.getContestRanking);
router.get("/user/skill-stats", LeetCodeController.getSkillStats);
router.get("/user/question-progress-v2", LeetCodeController.getUserProfileQuestionProgressV2);
router.get("/user/session-progress", LeetCodeController.getUserSessionProgress);
router.get("/contest-rating-histogram", LeetCodeController.getContestRatingHistogram);
router.get("/coding-challenge-medal", LeetCodeController.getCodingChallengeMedal);
router.get("/potd", LeetCodeController.getQuestionOfToday);
router.get("/contests/upcoming", LeetCodeController.getUpcomingContests);
router.get("/rankings/global", LeetCodeController.getGlobalTopRankers);

export default router;

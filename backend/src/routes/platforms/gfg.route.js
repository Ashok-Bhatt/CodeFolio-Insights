import express from "express";
import * as GfgController from "../../controllers/platforms/gfg.controller.js";

const router = express.Router();

router.get("/user/profile", GfgController.getUserInfo);
router.get("/user/submissions", GfgController.getUserSubmissions);
router.get("/user/problems", GfgController.getUserProblemsSolved);
router.get("/potd/today", GfgController.getQuestionOfToday);
router.get("/potd/monthly", GfgController.getMonthlyPotds);

export default router;

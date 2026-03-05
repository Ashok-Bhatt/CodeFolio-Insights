import express from "express";
import * as HackerRankController from "../../controllers/platforms/hackerrank.controller.js";

const router = express.Router();

router.get("/user/profile", HackerRankController.getUserInfo);

export default router;

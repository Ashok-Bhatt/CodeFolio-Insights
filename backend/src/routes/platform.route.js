import express from "express";
import Code360Router from "./platforms/code360.route.js";
import CodeChefRouter from "./platforms/codechef.route.js";
import GfgRouter from "./platforms/gfg.route.js";
import HackerRankRouter from "./platforms/hackerrank.route.js";
import InterviewBitRouter from "./platforms/interviewbit.route.js";
import LeetCodeRouter from "./platforms/leetcode.route.js";
import GithubRouter from "./platforms/github.route.js";

const router = express.Router();

router.use("/codechef", CodeChefRouter);
router.use("/code360", Code360Router);
router.use("/gfg", GfgRouter);
router.use("/hackerrank", HackerRankRouter);
router.use("/interviewbit", InterviewBitRouter);
router.use("/leetcode", LeetCodeRouter);
router.use("/github", GithubRouter);

export default router;
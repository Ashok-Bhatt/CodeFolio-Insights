import express from "express";
import Code360Router from "./platforms/code360.route.js";
import CodeChefRouter from "./platforms/codechef.route.js";
import GfgRouter from "./platforms/gfg.route.js";
import HackerRankRouter from "./platforms/hackerrank.route.js";
import InterviewBitRouter from "./platforms/interviewbit.route.js";
import LeetCodeRouter from "./platforms/leetcode.route.js";
import GithubRouter from "./platforms/github.route.js";

const router = express.Router();

router.get("/codechef", CodeChefRouter);
router.get("/code360", Code360Router);
router.get("/gfg", GfgRouter);
router.get("/hackerrank", HackerRankRouter);
router.get("/interviewbit", InterviewBitRouter);
router.get("/leetcode", LeetCodeRouter);
router.get("/github", GithubRouter);

export default router;
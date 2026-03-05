import express from "express";
import * as GithubController from "../../controllers/platforms/github.controller.js";

const router = express.Router();

router.get("/user/badges", GithubController.getGithubBadges);

export default router;

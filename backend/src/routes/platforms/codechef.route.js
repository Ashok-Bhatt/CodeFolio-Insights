import express from "express";
import * as CodeChefController from "../../controllers/platforms/codechef.controller.js";

const router = express.Router();

router.get("/user/profile", CodeChefController.getUserInfo);
router.get("/user/submissions", CodeChefController.getUserSubmissions);

export default router;

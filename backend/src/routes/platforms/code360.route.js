import express from "express";
import * as Code360Controller from "../../controllers/platforms/code360.controller.js";

const router = express.Router();

router.get("/user/profile", Code360Controller.getUserInfo);
router.get("/user/submissions", Code360Controller.getUserSubmissions);

export default router;

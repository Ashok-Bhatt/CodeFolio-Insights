import asyncHandler from '../utils/async-handler.util.js';
import * as ScoreService from "../services/score.service.js";

const getUserScoreHistory = asyncHandler(async (req, res) => {
    const user = req.user;
    const { platform, last, username } = req.query;
    const scoreHistory = await ScoreService.getUserScoreHistory(user?._id, platform, last, username);
    return res.status(200).json(scoreHistory);
});

export {
    getUserScoreHistory,
}

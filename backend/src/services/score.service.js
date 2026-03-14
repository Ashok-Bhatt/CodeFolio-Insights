import ScoreModel from "../models/score.model.js";

const getScoreComparison = async (score, platform) => {
    try {
        const equalOrLesserScore = await ScoreModel.find({ platform, score: { $lte: score } })
        const greaterScores = await ScoreModel.find({ platform, score: { $gt: score } });

        if (!greaterScores || !equalOrLesserScore) return null;

        const scoreComparison = {
            equalOrLesserEntries: equalOrLesserScore.length,
            greaterEntries: greaterScores.length,
        }

        return scoreComparison;
    } catch (error) {
        console.log("Error occurred while getting score comparison:", error);
        console.log(error.stack);
        return null;
    }
}

const savePlatformScore = async (score, platform, username) => {
    try {
        const existingScore = await ScoreModel.findOne({ platform, username });
        if (existingScore) {
            await existingScore.updateOne({ $set: { score } });
            return existingScore;
        } else {
            const newScore = await ScoreModel.create({ score, platform, username });
            return newScore;
        }
    } catch (error) {
        console.log("Error occurred while saving platform score:", error);
        console.log(error.stack);
        return null;
    }
}

const getUserScoreHistory = async (userId, platform, last, username) => {
    let scoreHistory;
    if (platform === "Leetcode" || platform === "Github") {
        if (!username || !username.trim()) throw new Error("username not provided");
        scoreHistory = await ScoreModel.find({
            username,
            platform,
        }).sort({ createdAt: -1 }).limit(last);
    } else {
        if (!userId) throw new Error("You are not authenticated!");
        scoreHistory = await ScoreModel.find({
            userId: userId,
            platform,
        }).sort({ createdAt: -1 }).limit(last);
    }

    if (!scoreHistory) throw new Error("Could not get score history");
    return scoreHistory;
};

export {
    getScoreComparison,
    savePlatformScore,
    getUserScoreHistory
}
import mongoose from "mongoose";

const apiLogsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "users",
    },
    endpoint: {
        type: String,
        required: true,
    },
    statusCode: {
        type: Number,
        required: true,
    },
    responseTime: {
        type: Number,
        required: true,
    },
    ipAddress: {
        type: String,
        required: true,
    },
    method: {
        type: String,
        required: true,
    },
    userAgent: {
        type: String,
    },
}, { timestamps: true });

const ApiLogsModel = mongoose.model("ApiLog", apiLogsSchema);

export default ApiLogsModel;
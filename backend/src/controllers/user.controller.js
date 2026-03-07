import asyncHandler from '../utils/async-handler.util.js';
import { ENV } from "../config/env.config.js";
import * as UserService from "../services/user.service.js";
import ApiProjectModel from "../models/api-project.model.js";

const getUser = asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const viewerDeviceToken = req.cookies.deviceToken;
    const viewerSignedDeviceToken = req.signedCookies.deviceToken;

    const { user, newDeviceToken } = await UserService.getUser(userId, req.user, viewerDeviceToken, viewerSignedDeviceToken);

    if (newDeviceToken) {
        res.cookie("deviceToken", newDeviceToken, {
            signed: true,
            httpOnly: true,
            secure: ENV !== "development",
            sameSite: ENV === "development" ? "lax" : "strict",
        });
    }

    return res.status(200).json(user);
});

const getUsers = asyncHandler(async (req, res) => {
    const { users, nextCursor, hasNext } = await UserService.getUsers({
        limit: req.query.limit,
        searchQuery: req.query.searchQuery,
        searchField: req.query.searchField,
        searchOrder: parseInt(req.query.searchOrder),
        cursorToken: req.query.cursor
    });

    res.status(200).json({
        users,
        nextCursor,
        hasNext
    });
});

const updateUserInfo = asyncHandler(async (req, res) => {
    const updatedUser = await UserService.updateUserInfo(req.user._id, req.body, req.file);
    return res.status(200).json(updatedUser);
});

const changePassword = asyncHandler(async (req, res) => {
    const result = await UserService.changePassword(req.user._id, req.body.oldPassword, req.body.newPassword);
    return res.status(200).json(result);
});

const toggleProfileVisibility = asyncHandler(async (req, res) => {
    const result = await UserService.toggleProfileVisibility(req.user._id);
    return res.status(200).json(result);
});

const getUserHighlights = asyncHandler(async (req, res) => {
    const highlights = await UserService.getUserHighlights();
    return res.status(200).json(highlights);
});

const toggle2FA = asyncHandler(async (req, res) => {
    const result = await UserService.toggle2FA(req.user._id);
    return res.status(200).json(result);
});

const updateUserApiKey = asyncHandler(async (req, res) => {
    const { apiKey } = req.body;
    const user = req.user;

    if (apiKey === undefined) return res.status(400).json({ message: "API Key is required" });

    const existingApiKey = await ApiProjectModel.findOne({ apiKey });
    if (!existingApiKey) return res.status(400).json({ message: "Invalid API Key!" });

    user.apiKey = apiKey;
    await user.save();

    return res.status(200).json({ message: "Default API Key updated successfully", apiKey: user.apiKey });
});

export {
    getUser,
    getUserHighlights,
    getUsers,
    updateUserInfo,
    changePassword,
    toggleProfileVisibility,
    toggle2FA,
    updateUserApiKey,
}

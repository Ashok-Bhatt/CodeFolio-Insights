import UserModel from "../models/user.model.js";
import ProfileModel from "../models/profile.model.js";
import { destroyFile, uploadFile } from "../utils/cloudinary.js";
import bcrypt from "bcrypt";
import asyncHandler from '../utils/asyncHandler.js';
import ProfileViewModel from "../models/profileView.model.js";
import { ENV } from "../config/config.js";
import { addProfileView } from "../services/profileView.service.js";


const getSearchQuery = (searchField, searchOrder, cursor) => {
    const compare = searchOrder == 1 ? '$gt' : '$lt';
    const secondaryCompare = '$lt';
    const cursorId = new mongoose.Types.ObjectId(cursor._id)
    let cursorValue;

    if (searchField == "createdAt" || searchField == "updatedAt") cursorValue = new Date(cursor[searchField]);
    else if (searchField == "profileViews") cursorValue = parseInt(cursor[searchField]);
    else cursorValue = cursor[searchField];

    return {
        $or: [
            { [searchField]: { [compare]: cursorValue } },
            { [searchField]: cursorValue, _id: { [secondaryCompare]: cursorId } }
        ]
    }
}

const getSortQuery = (searchField, searchOrder) => {
    return { [searchField]: searchOrder, _id: -1 };
}



const getUser = asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const viewerId = req.user?._id;
    const viewerDeviceToken = req.cookies.deviceToken;
    const viewerSignedDeviceToken = req.signedCookies.deviceToken;
    let newDeviceToken = null;

    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found." });

    const isAdmin = !!req.user && req.user.isAdmin;
    const isOwner = !!req.user && req.user._id.equals(userId);
    const isPublic = user.profileVisibility === true;

    if (!isAdmin && !isOwner && !isPublic) return res.status(403).json({ message: "Profile visibility is set to private." });

    if (viewerDeviceToken && !viewerSignedDeviceToken) {
        console.log("Invalid device token!");
        return;
    }

    newDeviceToken = await addProfileView(userId, viewerId, viewerDeviceToken);

    if (newDeviceToken) {
        res.cookie("deviceToken", newDeviceToken, {
            signed: true,
            httpOnly: true,
            secure: ENV !== "development",
            sameSite: ENV === "development" ? "lax" : "strict",
        });
    }

    const queriedUser = await UserModel.findById(userId).select("-googleId -password").lean();
    if (!queriedUser) return res.status(404).json({ message: "Invalid user id!" });

    const profileLinks = await ProfileModel.findOne({ userId }).select("-_id -userId -createdAt -updatedAt");
    if (!profileLinks) return res.status(404).json({ message: "Something went wrong!" });

    queriedUser.profileLinks = profileLinks;

    const userProfileViewsModels = await ProfileViewModel.find({ vieweeId: userId })
    const userProfileViews = userProfileViewsModels.reduce((totalCount, document) => {
        return totalCount + (document.count || 0);
    }, 0);
    queriedUser.profileViews = userProfileViews;

    return res.status(200).json(queriedUser);
});

const getUsers = asyncHandler(async (req, res) => {
    const limit = Math.min(req.query.limit || 10, 100);
    const searchQuery = req.query.searchQuery || "";
    const searchField = req.query.searchField;
    const searchOrder = parseInt(req.query.searchOrder) || 0;
    let cursor = null;
    let query = {};
    let fieldQuery = {};
    let sortQuery = {};

    if (searchOrder !== 1 && searchOrder !== -1) return res.status(400).json({ message: "The value of search order should be 1 or -1 only!" });

    if (req.query.cursor) {
        cursor = JSON.parse(decodeURIComponent(req.query.cursor));
    }

    if (searchField == "createdAt") sortQuery = getSortQuery("createdAt", searchOrder);
    else if (searchField == "updatedAt") sortQuery = getSortQuery("updatedAt", searchOrder);
    else if (searchField == "name") sortQuery = getSortQuery("name", searchOrder);
    else if (searchField == "profileViews") sortQuery = getSortQuery("profileViews", searchOrder);

    if (cursor) {
        if (searchField == "createdAt") fieldQuery = getSearchQuery("createdAt", searchOrder, cursor);
        else if (searchField == "updatedAt") fieldQuery = getSearchQuery("updatedAt", searchOrder, cursor);
        else if (searchField == "name") fieldQuery = getSearchQuery("name", searchOrder, cursor);
        else if (searchField == "profileViews") fieldQuery = getSearchQuery("profileViews", searchOrder, cursor);

        query = {
            $and: [
                fieldQuery,
                { name: { $regex: searchQuery, $options: 'i' } }
            ]
        };
    } else {
        query = {
            name: { $regex: searchQuery, $options: 'i' }
        }
    }

    const users = await UserModel.find(query).sort(sortQuery).limit(limit + 1);
    const hasNext = users.length > limit;
    const pageUsers = hasNext ? users.slice(0, limit) : users;
    const nextCursor = hasNext ? pageUsers[pageUsers.length - 1] : null;

    res.status(200).json({
        users: pageUsers,
        nextCursor: nextCursor ? encodeURIComponent(JSON.stringify(nextCursor)) : null,
        hasNext
    });
});

const updateUserInfo = asyncHandler(async (req, res) => {
    const user = req.user;
    const updatedFields = req.body;
    const file = req.file;

    const userId = user._id;

    const queriedUser = await UserModel.findById(userId).select("-googleId -password");
    if (!queriedUser) return res.status(404).json({ message: "Invalid user id!" });

    const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        { $set: updatedFields },
        {
            new: true,
            runValidators: true
        }
    );

    if (!updatedUser) return res.status(500).json({ message: "Could not update the user info" });

    if (file) {
        const previousProfileImageUrl = updatedUser.profile;
        const newProfileImageUrl = await uploadFile(file.path, "Codefolio/Profiles");

        if (newProfileImageUrl) {
            if (previousProfileImageUrl) await destroyFile(previousProfileImageUrl, "Codefolio/Profiles");
            updatedUser.profile = newProfileImageUrl;
            await updatedUser.save();
        } else {
            return res.status(500).json({ message: "Couldn't upload new profile image!" });
        }
    }

    return res.status(200).json(updatedUser);
});

const changePassword = asyncHandler(async (req, res) => {
    const user = req.user;
    const { oldPassword, newPassword } = req.body;

    if (oldPassword === newPassword) return res.status(400).json({ message: "old and new password are same" });

    const queriedUser = await UserModel.findById(user._id);
    if (!queriedUser) return res.status(404).json({ message: "User not found!" });

    if (queriedUser.password) {
        if (await bcrypt.compare(oldPassword, queriedUser.password)) {
            queriedUser.password = await bcrypt.hash(newPassword, await bcrypt.genSalt(10));
            await queriedUser.save();
            return res.status(200).json({ message: "Password Changed" });
        } else {
            return res.status(400).json({ message: "Wrong password!" });
        }
    } else {
        return res.status(400).json({ message: "You are logged in through third party login services, and not general password login" });
    }
});

const toggleProfileVisibility = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const user = await UserModel.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found!" });

    user.profileVisibility = !user.profileVisibility;
    await user.save();

    return res.status(200).json({
        message: `Profile visibility set to ${user.profileVisibility ? "Public" : "Private"}`,
        profileVisibility: user.profileVisibility
    });
});

const getUserHighlights = asyncHandler(async (req, res) => {
    const totalUsers = await UserModel.countDocuments();
    const sampleUsersSize = 5;
    const sampleUsers = await UserModel.find({ profileVisibility: true })
        .limit(sampleUsersSize)
        .select("name profile")
        .lean();

    return res.status(200).json({
        totalUsers,
        sampleUsers
    });
});

const toggle2FA = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const user = await UserModel.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found!" });

    user.enable2FA = !user.enable2FA;
    await user.save();

    return res.status(200).json({
        message: `Two-Factor Authentication ${user.enable2FA ? "Enabled" : "Disabled"}`,
        enable2FA: user.enable2FA
    });
});

export {
    getUser,
    getUserHighlights,
    getUsers,
    updateUserInfo,
    changePassword,
    toggleProfileVisibility,
    toggle2FA,
}

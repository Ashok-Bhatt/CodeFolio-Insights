import UserModel from "../models/user.model.js";
import ProfileModel from "../models/profile.model.js";
import ProfileViewModel from "../models/profile-view.model.js";
import { destroyFile, uploadFile } from "../utils/cloudinary.util.js";
import bcrypt from "bcrypt";
import { addProfileView } from "./profile-view.service.js";
import mongoose from "mongoose";

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

const getUser = async (userId, currentUser, viewerDeviceToken, viewerSignedDeviceToken) => {
    const user = await UserModel.findById(userId);
    if (!user) throw new Error("User not found.");

    const isAdmin = !!currentUser && currentUser.isAdmin;
    const isOwner = !!currentUser && currentUser._id.equals(userId);
    const isPublic = user.profileVisibility === true;

    if (!isAdmin && !isOwner && !isPublic) throw new Error("Profile visibility is set to private.");

    if (viewerDeviceToken && !viewerSignedDeviceToken) {
        throw new Error("Invalid device token!");
    }

    const viewerId = currentUser?._id;
    const newDeviceToken = await addProfileView(userId, viewerId, viewerDeviceToken);

    const queriedUser = await UserModel.findById(userId).select("-googleId -password").lean();
    if (!queriedUser) throw new Error("Invalid user id!");

    const profileLinks = await ProfileModel.findOne({ userId }).select("-_id -userId -createdAt -updatedAt");
    queriedUser.profileLinks = profileLinks || {};

    const userProfileViewsModels = await ProfileViewModel.find({ vieweeId: userId })
    const userProfileViews = userProfileViewsModels.reduce((totalCount, document) => {
        return totalCount + (document.count || 0);
    }, 0);
    queriedUser.profileViews = userProfileViews;

    return { user: queriedUser, newDeviceToken };
};

const getUsers = async (params) => {
    const { limit = 10, searchQuery = "", searchField, searchOrder = 0, cursorToken } = params;
    const effectiveLimit = Math.min(limit, 100);

    if (searchOrder !== 1 && searchOrder !== -1) throw new Error("The value of search order should be 1 or -1 only!");

    let cursor = null;
    if (cursorToken) {
        cursor = JSON.parse(decodeURIComponent(cursorToken));
    }

    let sortQuery = {};
    if (["createdAt", "updatedAt", "name", "profileViews"].includes(searchField)) {
        sortQuery = getSortQuery(searchField, searchOrder);
    }

    let query = {};
    if (cursor) {
        const fieldQuery = getSearchQuery(searchField, searchOrder, cursor);
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

    const users = await UserModel.find(query).sort(sortQuery).limit(effectiveLimit + 1);
    const hasNext = users.length > effectiveLimit;
    const pageUsers = hasNext ? users.slice(0, effectiveLimit) : users;
    const nextCursor = hasNext ? pageUsers[pageUsers.length - 1] : null;

    return {
        users: pageUsers,
        nextCursor: nextCursor ? encodeURIComponent(JSON.stringify(nextCursor)) : null,
        hasNext
    };
};

const updateUserInfo = async (userId, updatedFields, file) => {
    const queriedUser = await UserModel.findById(userId).select("-googleId -password");
    if (!queriedUser) throw new Error("Invalid user id!");

    const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        { $set: updatedFields },
        {
            new: true,
            runValidators: true
        }
    );

    if (!updatedUser) throw new Error("Could not update the user info");

    if (file) {
        const previousProfileImageUrl = updatedUser.profile;
        const newProfileImageUrl = await uploadFile(file.path, "Codefolio/Profiles");

        if (newProfileImageUrl) {
            if (previousProfileImageUrl) await destroyFile(previousProfileImageUrl, "Codefolio/Profiles");
            updatedUser.profile = newProfileImageUrl;
            await updatedUser.save();
        } else {
            throw new Error("Couldn't upload new profile image!");
        }
    }

    return updatedUser;
};

const changePassword = async (userId, oldPassword, newPassword) => {
    if (oldPassword === newPassword) throw new Error("old and new password are same");

    const user = await UserModel.findById(userId);
    if (!user) throw new Error("User not found!");

    if (!user.password) {
        throw new Error("You are logged in through third party login services, and not general password login");
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) throw new Error("Wrong password!");

    user.password = await bcrypt.hash(newPassword, await bcrypt.genSalt(10));
    await user.save();

    return { message: "Password Changed" };
};

const toggleProfileVisibility = async (userId) => {
    const user = await UserModel.findById(userId);
    if (!user) throw new Error("User not found!");

    user.profileVisibility = !user.profileVisibility;
    await user.save();

    return {
        message: `Profile visibility set to ${user.profileVisibility ? "Public" : "Private"}`,
        profileVisibility: user.profileVisibility
    };
};

const getUserHighlights = async () => {
    const totalUsers = await UserModel.countDocuments();
    const sampleUsersSize = 5;
    const sampleUsers = await UserModel.find({ profileVisibility: true })
        .limit(sampleUsersSize)
        .select("name profile")
        .lean();

    return {
        totalUsers,
        sampleUsers
    };
};

const toggle2FA = async (userId) => {
    const user = await UserModel.findById(userId);
    if (!user) throw new Error("User not found!");

    user.enable2FA = !user.enable2FA;
    await user.save();

    return {
        message: `Two-Factor Authentication ${user.enable2FA ? "Enabled" : "Disabled"}`,
        enable2FA: user.enable2FA
    };
};

export {
    getUser,
    getUsers,
    updateUserInfo,
    changePassword,
    toggleProfileVisibility,
    getUserHighlights,
    toggle2FA,
};

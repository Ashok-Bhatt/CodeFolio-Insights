import ProfileModel from '../models/profile.model.js';
import UserModel from '../models/user.model.js';
import mongoose from 'mongoose';
import redisClient from '../config/redis.js';
import asyncHandler from '../utils/asyncHandler.js';
import { PLATFORMS } from '../constants/index.js';
import * as platformsFetching from '../utils/fetching/platformsFetch.js';


const getProfiles = asyncHandler(async (req, res) => {
    const userId = req.params.userId;

    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found." });

    const isAdmin = !!req.user && req.user.isAdmin;
    const isOwner = !!req.user && req.user._id.equals(userId);
    const isPublic = user.profileVisibility === true;

    if (!isAdmin && !isOwner && !isPublic) return res.status(403).json({ message: "Profile visibility is set to private." });

    const profiles = await ProfileModel.findOneAndUpdate(
        { userId: userId },
        { userId: userId },
        {
            new: true,
            upsert: true, // Key: create if not found
            setDefaultsOnInsert: true // Use schema defaults (e.g., empty strings for usernames)
        }
    );

    if (!profiles) return res.status(500).json({ message: "Failed to retrieve the user data." });
    return res.status(200).json(profiles);
});

const updateProfile = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const user = req.user;
        const { platformName, platformUsername } = req.query;

        const platformKey = PLATFORMS[platformName].field;

        const profile = await ProfileModel.findOneAndUpdate(
            { userId: user._id },
            { [platformKey]: platformUsername },
            { new: true, upsert: true, session }
        );

        if (!profile) {
            await session.abortTransaction();
            return res.status(404).json({ message: "Failed to update the user data." });
        }

        const profilesData = await redisClient.get(`profileData:${user._id}`);
        const platformrefreshedData = await PLATFORMS[platformName].fetchFunction(platformUsername);
        if (!platformrefreshedData) {
            await session.abortTransaction();
            return res.status(500).json({ message: "Failed to fetch the user data." });
        }

        let mergedData = { ...profilesData };
        mergedData[platformName] = platformrefreshedData;

        await session.commitTransaction();
        if (mergedData) await redisClient.set(`profileData:${user._id}`, mergedData);

        return res.status(200).json(profile);

    } catch (error) {
        if (session.inTransaction()) {
            await session.abortTransaction();
        }
        console.log("Failed to update the profile username of the platform:", error.message);
        console.log(error.stack);
        return res.status(500).json({ message: "Failed to update the user data." });
    } finally {
        session.endSession();
    }
}

const updateProfiles = asyncHandler(async (req, res) => {
    const user = req.user;
    const updateFields = req.body;

    const userId = user._id;

    let $setFields = { ...updateFields };
    delete $setFields.userId;

    const updatedProfile = await ProfileModel.findOneAndUpdate(
        { userId: userId },
        { $set: $setFields },
        { new: true, runValidators: true, upsert: true }
    );

    if (!updatedProfile) return res.status(404).json({ message: "Could not update user profile links." });
    return res.status(200).json(updatedProfile);
});

const getProfileCache = asyncHandler(async (req, res) => {
    const userId = req.params.userId;

    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found." });

    const isAdmin = !!req.user && req.user.isAdmin;
    const isOwner = !!req.user && req.user._id.equals(userId);
    const isPublic = user.profileVisibility === true;

    if (!isAdmin && !isOwner && !isPublic) return res.status(403).json({ message: "Profile visibility is set to private." });

    const cachedDataParams = await redisClient.get(`profileData:${userId}`);

    if (cachedDataParams) return res.status(200).json(cachedDataParams);
    return res.status(200).json(null);
});

const refreshProfileData = asyncHandler(async (req, res) => {
    const userId = req.params.userId;

    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found." });

    const isAdmin = req.user && req.user.isAdmin;
    const isOwner = req.user && req.user._id.equals(userId);
    const isPublic = user.profileVisibility === true;

    if (!isAdmin && !isOwner && !isPublic) return res.status(403).json({ message: "Profile visibility is set to private." });

    const profileLinks = await ProfileModel.findOne({ userId });

    if (!profileLinks) return res.status(404).json({ message: "User profiles not configured." });

    const cachedData = await redisClient.get(`profileData:${userId}`) || {};

    const PLATFORMS_WITH_MULTIYEAR_SUBMISSION_DATA = ['gfg', 'interviewbit', 'code360', 'leetcode'];
    const currentYear = new Date().getFullYear();

    const fetchPlatformData = async (platform, username) => {
        if (!username) return null;
        if (platform === 'github') return await platformsFetching.fetchGitHubData(username);

        if (PLATFORMS_WITH_MULTIYEAR_SUBMISSION_DATA.includes(platform)) {
            const hasCurrentYearData = cachedData[platform]?.submission?.[currentYear];
            if (hasCurrentYearData) {
                return await PLATFORMS[platform].fetchFunction(username, currentYear);
            }
        }
        return await PLATFORMS[platform].fetchFunction(username);
    };

    const refreshedData = {
        gfg: await fetchPlatformData('gfg', profileLinks.gfgUsername),
        codechef: await fetchPlatformData('codechef', profileLinks.codechefUsername),
        interviewbit: await fetchPlatformData('interviewbit', profileLinks.interviewbitUsername),
        code360: await fetchPlatformData('code360', profileLinks.code360Username),
        hackerrank: await fetchPlatformData('hackerrank', profileLinks.hackerrankUsername),
        leetcode: await fetchPlatformData('leetcode', profileLinks.leetCodeUsername),
        github: await fetchPlatformData('github', profileLinks.githubUsername),
    };

    const mergedData = { ...cachedData };

    Object.keys(PLATFORMS).forEach(platform => {
        let usernameKey = PLATFORMS[platform]?.field;

        if (!profileLinks[usernameKey]) {
            mergedData[platform] = null;
        } else {
            if (refreshedData[platform]) {
                if (!mergedData[platform]) {
                    mergedData[platform] = refreshedData[platform];
                } else {
                    const refreshedPlatformData = refreshedData[platform];
                    const cachedPlatformData = mergedData[platform];

                    const mergedPlatformData = { ...cachedPlatformData };

                    Object.keys(refreshedPlatformData).forEach(key => {
                        if (refreshedPlatformData[key] !== null && refreshedPlatformData[key] !== undefined) {
                            if (key === 'submission' && mergedPlatformData[key]) {
                                mergedPlatformData[key] = { ...mergedPlatformData[key], ...refreshedPlatformData[key] };
                            } else {
                                mergedPlatformData[key] = refreshedPlatformData[key];
                            }
                        }
                    });

                    mergedData[platform] = mergedPlatformData;
                }
            }
        }
    });

    mergedData.lastUpdated = Date.now();
    await redisClient.set(`profileData:${userId}`, mergedData);

    user.lastRefresh = Date.now();
    await user.save();

    return res.status(200).json(mergedData);
});


export {
    getProfiles,
    updateProfile,
    updateProfiles,
    refreshProfileData,
    getProfileCache
}

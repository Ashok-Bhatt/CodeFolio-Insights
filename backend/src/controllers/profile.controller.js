import asyncHandler from '../utils/async-handler.util.js';
import * as ProfileService from '../services/profile.service.js';

const getProfiles = asyncHandler(async (req, res) => {
    const displayName = req.params.displayName;
    const profiles = await ProfileService.getProfiles(displayName, req.user);
    return res.status(200).json(profiles);
});

const updateProfile = asyncHandler(async (req, res) => {
    const user = req.user;
    const { platformName, platformUsername } = req.query;
    const profile = await ProfileService.updateProfile(user._id, platformName, platformUsername);
    return res.status(200).json(profile);
});

const getProfileCache = asyncHandler(async (req, res) => {
    const displayName = req.params.displayName;
    const cachedData = await ProfileService.getProfileCache(displayName, req.user);
    return res.status(200).json(cachedData);
});

const refreshProfileData = asyncHandler(async (req, res) => {
    const displayName = req.params.displayName;
    const mergedData = await ProfileService.refreshProfileData(displayName, req.user);
    return res.status(200).json(mergedData);
});

export {
    getProfiles,
    updateProfile,
    refreshProfileData,
    getProfileCache
}

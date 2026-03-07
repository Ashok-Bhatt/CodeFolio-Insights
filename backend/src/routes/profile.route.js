import { Router } from "express";
import { getProfiles, refreshProfileData, getProfileCache, updateProfile } from "../controllers/profile.controller.js";
import { optionalAuth, protectRoute } from "../middlewares/auth.middleware.js";
import { getAnalytics } from "../middlewares/analytics.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import { profileUpdateValidationSchema } from "../validators/profiles.validate.js";
import { userIdValidationSchema } from "../validators/user.validate.js";

const router = Router();

router.get(
    "/fetch/:userId",
    optionalAuth, 
    getAnalytics, 
    validate(userIdValidationSchema), 
    refreshProfileData
);

router.get(
    "/cache/:userId",
    getAnalytics,
    optionalAuth,
    validate(userIdValidationSchema),
    getProfileCache
);

router.get(
    "/:userId",
    getAnalytics,
    optionalAuth,
    validate(userIdValidationSchema),
    getProfiles
);

router.patch(
    "/platform",
    getAnalytics,
    protectRoute,
    validate(profileUpdateValidationSchema),
    updateProfile
);


export default router;
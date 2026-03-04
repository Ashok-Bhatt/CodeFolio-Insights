import { Router } from "express";
import { getProfiles, refreshProfileData, getProfileCache, updateProfile } from "../controllers/profile.controller.js";
import { optionalAuth, protectRoute } from "../middlewares/auth.middleware.js";
import { getAnalytics } from "../middlewares/analytics.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import { profileUpdateValidationSchema } from "../validators/profiles.validate.js";
import { userIdValidationSchema } from "../validators/user.validate.js";

const router = Router();

router.route("/fetch/:userId").get(optionalAuth, getAnalytics, validate(userIdValidationSchema), refreshProfileData);
router.route("/cache/:userId").get(optionalAuth, getAnalytics, validate(userIdValidationSchema), getProfileCache);
router.route("/:userId").get(optionalAuth, getAnalytics, validate(userIdValidationSchema), getProfiles);
router.route("/platform").patch(protectRoute, getAnalytics, validate(profileUpdateValidationSchema), updateProfile);

export default router;
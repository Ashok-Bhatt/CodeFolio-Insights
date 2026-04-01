import bcrypt from 'bcrypt';
import UserModel from "../models/user.model.js";
import VerificationModel from "../models/verification.model.js";
import ApiProjectModel from '../models/api-project.model.js';
import { sendOtpEmail } from '../utils/sendgrid.util.js';
import { generateApiKey } from '../utils/api-key.util.js';
import { generateOTP } from '../utils/otp.util.js';
import { OTP_EXPIRY_TIME } from '../constants/index.js'
import ApiError from '../utils/api-error.util.js';

const signup = async (name, email, password) => {
    let user = await UserModel.findOne({ email });
    if (user) throw new ApiError(400, 'User with this email already exists');

    // Hash password and OTP
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const otp = generateOTP();
    const otpHash = await bcrypt.hash(otp, salt);

    // Create verification entry
    const verification = new VerificationModel({
        email,
        name,
        password: passwordHash,
        otp: otpHash,
        type: 'signup',
        expiresAt: new Date(Date.now() + OTP_EXPIRY_TIME) // 10 minutes
    });
    await verification.save();

    // Send OTP via email
    const emailSent = await sendOtpEmail(email, otp);
    if (!emailSent) {
        await VerificationModel.findByIdAndDelete(verification._id);
        throw new ApiError(500, 'Error sending verification email');
    }

    return { verificationId: verification._id };
};

const login = async (email, password) => {
    let user = await UserModel.findOne({ email });

    if (!user) throw new ApiError(401, 'Invalid Credentials');
    if (!user.password) throw new ApiError(401, 'Invalid Credentials');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new ApiError(401, 'Invalid Credentials');

    // If 2FA is disabled, return user
    if (!user.enable2FA) {
        return { user, requires2FA: false };
    }

    // 2FA is enabled
    const otp = generateOTP();
    const salt = await bcrypt.genSalt(10);
    const otpHash = await bcrypt.hash(otp, salt);

    const verification = new VerificationModel({
        email: user.email,
        userId: user._id,
        otp: otpHash,
        type: 'login',
        expiresAt: new Date(Date.now() + OTP_EXPIRY_TIME)
    });
    await verification.save();

    const emailSent = await sendOtpEmail(user.email, otp);
    if (!emailSent) {
        await VerificationModel.findByIdAndDelete(verification._id);
        throw new ApiError(500, 'Error sending verification email');
    }

    return { verificationId: verification._id, requires2FA: true };
};

const verifyOTP = async (otp, verificationId) => {
    const verification = await VerificationModel.findById(verificationId);
    if (!verification) throw new ApiError(404, 'Verification record not found or expired');

    // Verify OTP
    const isOTPValid = await bcrypt.compare(otp, verification.otp);
    if (!isOTPValid) throw new ApiError(400, 'Invalid verification code');

    let user;
    if (verification.type === 'signup') {
        const apiKey = generateApiKey()

        // Only now create the user
        user = new UserModel({
            name: verification.name,
            email: verification.email,
            password: verification.password, // already hashed
            enable2FA: false,
            provider: 'credential',
            apiKey: apiKey,
            lastRefresh: Date.now()
        });
        await user.save();

        // Create initial "Testing" project
        const initialProject = new ApiProjectModel({
            name: "Testing",
            userId: user._id,
            apiKey: apiKey
        });
        await initialProject.save();
    } else {
        // Login type
        user = await UserModel.findById(verification.userId);
    }

    if (!user) throw new ApiError(404, 'User not found');

    // Clean up
    await VerificationModel.findByIdAndDelete(verification._id);

    return user;
};

export {
    signup,
    login,
    verifyOTP
};

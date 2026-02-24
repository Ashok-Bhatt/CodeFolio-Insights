import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from "../models/user.model.js";
import VerificationModel from "../models/verification.model.js";
import { JWT_SECRET } from '../config/config.js';
import { generateAuthToken, generateVerificationToken, deleteAuthToken, deleteVerificationToken } from '../utils/tokenGenerator.js';
import { sendOtpEmail } from '../utils/nodemailer.js';
import asyncHandler from '../utils/asyncHandler.js';

// Helper to generate 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

const signup = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    let user = await UserModel.findOne({ email });
    if (user) return res.status(400).json({ message: 'User with this email already exists' });

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
        expiresAt: new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
    });
    await verification.save();

    // Send OTP via email
    const emailSent = await sendOtpEmail(email, otp);
    if (!emailSent) {
        await VerificationModel.findByIdAndDelete(verification._id);
        return res.status(500).json({ message: 'Error sending verification email' });
    }

    const verificationToken = generateVerificationToken(verification._id, res);

    return res.status(200).json({
        message: 'Verification code sent to your email',
        requires2FA: true,
        verificationToken
    });
});

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    let user = await UserModel.findOne({ email });

    if (!user) return res.status(400).json({ message: 'Invalid Credentials' });
    if (!user.password) return res.status(400).json({ message: 'Invalid Credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid Credentials' });

    // If 2FA is disabled, login directly
    if (!user.enable2FA) {
        const userObject = user.toObject();
        delete userObject.password;
        if (userObject.hasOwnProperty("googleId")) delete userObject.googleId;

        const token = generateAuthToken(user._id, res);
        return res.status(200).json({ token, user: userObject });
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
        expiresAt: new Date(Date.now() + 10 * 60 * 1000)
    });
    await verification.save();

    const emailSent = await sendOtpEmail(user.email, otp);
    if (!emailSent) {
        await VerificationModel.findByIdAndDelete(verification._id);
        return res.status(500).json({ message: 'Error sending verification email' });
    }

    const verificationToken = generateVerificationToken(verification._id, res);

    return res.status(200).json({
        message: '2FA code sent to your email',
        requires2FA: true,
        verificationToken
    });
});

const verifyOTP = asyncHandler(async (req, res) => {
    const { otp } = req.body;
    const vToken = req.cookies.verificationToken || req.header("Authorization")?.replace("Bearer ", "");

    if (!vToken) return res.status(401).json({ message: 'Verification session expired' });

    let decoded;
    try {
        decoded = jwt.verify(vToken, JWT_SECRET);
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired verification token' });
    }

    const verification = await VerificationModel.findById(decoded.verification.id);
    if (!verification) return res.status(404).json({ message: 'Verification record not found or expired' });

    // Verify OTP
    const isOTPValid = await bcrypt.compare(otp, verification.otp);
    if (!isOTPValid) return res.status(400).json({ message: 'Invalid verification code' });

    let user;
    if (verification.type === 'signup') {
        // Only now create the user
        user = new UserModel({
            name: verification.name,
            email: verification.email,
            password: verification.password, // already hashed
            enable2FA: false, // Default false as per requirement
            provider: 'credential',
            lastRefresh: Date.now()
        });
        await user.save();
    } else {
        // Login type
        user = await UserModel.findById(verification.userId);
    }

    if (!user) return res.status(404).json({ message: 'User not found' });

    // Clean up
    deleteVerificationToken(res); // Clear verificationToken from cookies
    await VerificationModel.findByIdAndDelete(verification._id);

    const userObject = user.toObject();
    delete userObject.password;
    if (userObject.hasOwnProperty("googleId")) delete userObject.googleId;

    const token = generateAuthToken(user._id, res);
    return res.status(200).json({
        message: verification.type === 'signup' ? 'Account verified and created!' : 'Logged in successfully!',
        token,
        user: userObject
    });
});

const logout = asyncHandler(async (req, res, next) => {
    deleteAuthToken(res);
    return res.status(200).json({ message: 'Logged out successfully' });
});

const checkAuth = asyncHandler(async (req, res) => {
    const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "") || null;
    if (!token) return res.status(401).json({ message: "Unauthenticated User! Token not provided" });

    const decodedToken = jwt.verify(token, JWT_SECRET);
    const user = await UserModel.findById(decodedToken.user.id).select("-password -googleId");

    if (!user) return res.status(401).json({ message: "Invalid token" });
    return res.status(200).json({ user: user, token: token, message: "Token validated!" });
});

export {
    signup,
    login,
    verifyOTP,
    logout,
    checkAuth
};

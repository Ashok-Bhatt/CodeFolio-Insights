import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from "../models/user.model.js";
import { JWT_SECRET } from '../config/config.js';
import { generateToken, deleteToken } from '../utils/tokenGenerator.js';
import asyncHandler from '../utils/asyncHandler.js';

const signup = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    let user = await UserModel.findOne({ email });
    if (user) return res.status(400).json({ message: 'User with this email already exists' });

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    user = new UserModel({
        name,
        email,
        password: passwordHash,
        lastRefresh: Date.now()
    });
    await user.save();

    const userObject = user.toObject();
    if (userObject.hasOwnProperty("password")) delete userObject.password;

    const token = generateToken(user._id, res);
    return res.status(201).json({
        message: 'User registered successfully',
        token,
        user: userObject
    });
});

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    let user = await UserModel.findOne({ email });

    if (!user) return res.status(400).json({ message: 'Invalid Credentials' });
    if (!user.password) return res.status(400).json({ message: 'Invalid Credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid Credentials' });

    const userObject = user.toObject();
    if (userObject.hasOwnProperty("password")) delete userObject.password;
    if (userObject.hasOwnProperty("googleId")) delete userObject.googleId;

    const token = generateToken(user._id, res);
    return res.status(200).json({ token, user: userObject });
});

const logout = asyncHandler(async (req, res, next) => {
    deleteToken(res);
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
    logout,
    checkAuth
};

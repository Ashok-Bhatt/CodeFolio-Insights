import jwt from "jsonwebtoken";
import { JWT_SECRET, ENV } from "../config/env.config.js";

const generateAuthToken = (userId, res) => {

    const payload = {
        user: {
            id: userId,
        }
    };

    const token = jwt.sign(
        payload,
        JWT_SECRET,
        { expiresIn: "15d" },
    );

    res.cookie("token", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: ENV === "production" ? "None" : "Lax",
        secure: ENV === "production",
    })

    return token;
}

const generateVerificationToken = (verificationId, res) => {
    const payload = {
        verification: {
            id: verificationId,
        }
    };

    const token = jwt.sign(
        payload,
        JWT_SECRET,
        { expiresIn: "10m" }, // short-lived
    );

    res.cookie("verificationToken", token, {
        maxAge: 10 * 60 * 1000,
        httpOnly: true,
        sameSite: ENV === "production" ? "None" : "Lax",
        secure: ENV === "production",
    })

    return token;
}

const deleteAuthToken = (res) => {
    res.cookie("token", "", {
        maxAge: 1,
        httpOnly: true,
        sameSite: ENV === "production" ? "None" : "Lax",
        secure: ENV === "production",
    })
}

const deleteVerificationToken = (res) => {
    res.cookie("verificationToken", "", {
        maxAge: 1,
        httpOnly: true,
        sameSite: ENV === "production" ? "None" : "Lax",
        secure: ENV === "production",
    })
}

export {
    generateAuthToken,
    generateVerificationToken,
    deleteAuthToken,
    deleteVerificationToken,
}
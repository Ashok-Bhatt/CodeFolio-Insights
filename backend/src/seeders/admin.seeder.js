import UserModel from "../models/user.model.js"
import ApiProjectModel from '../models/api-project.model.js';
import { ADMIN_EMAIL, ADMIN_PASSWORD } from "../config/env.config.js";
import bcrypt from 'bcrypt';
import { generateApiKey } from '../utils/api-key.util.js';

const createAdmin = async () => {
    try {
        const admin = await UserModel.findOne({ email: ADMIN_EMAIL });

        if (admin) {
            console.log("Admin already exists");
        } else {
            const apiKey = generateApiKey()
            const newAdmin = await UserModel.create({
                name: "Admin",
                email: ADMIN_EMAIL,
                password: await bcrypt.hash(ADMIN_PASSWORD, await bcrypt.genSalt(10)),
                isAdmin: true,
                apiKey: apiKey,
            });

            const initialProject = new ApiProjectModel({
                name: "Testing",
                userId: newAdmin._id,
                apiKey: apiKey
            });

            await initialProject.save();
        }
    } catch (error) {
        console.log("Error occurred:", error.message);
        console.log(error.stack);
    }
}

export {
    createAdmin,
}
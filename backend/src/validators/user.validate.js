import z from "zod";
import { objectIdRegex , nameRegex } from "../constants/index.js";

const usersQueryValidationSchema = z.object({
    query: z.object({
        limit: z.string().optional().transform(v => parseInt(v) || 10),
        searchQuery: z.string().optional(),
        searchField: z.string().optional(),
        searchOrder: z.string().optional().transform(v => parseInt(v) || 0),
        cursor: z.string().optional()
    })
});

const userInfoUpdateValidationSchema = z.object({
    body: z.object({
        name: z.string().min(3, "Name must be at least 3 characters long").optional(),
        phone: z.string().optional().nullable(),
        countryCode: z.string().optional().nullable(),
    }).passthrough().refine(data => {
        if ((data.phone && !data.countryCode) || (!data.phone && data.countryCode)) {
            return false;
        }
        return true;
    }, {
        message: "Both Country Code and Phone Number are required if one is provided!",
        path: ["phone"] // Pointing to phone, but it applies to both
    })
});

const changePasswordValidationSchema = z.object({
    body: z.object({
        oldPassword: z.string().min(6, "Old password must be at least 6 characters long"),
        newPassword: z.string().min(6, "New password must be at least 6 characters long"),
    })
});

const userIdValidationSchema = z.object({
    params: z.object({
        userId: z.string({ message: "User id is required!" }).regex(objectIdRegex, "Invalid user ID format.")
    })
});

const displayNameValidationSchema = z.object({
    params: z.object({
        displayName: z.string({ message: "Display name is required!" }).min(3, "Display name must be at least 3 characters long").regex(nameRegex, "Display name can only contain letters, numbers, underscores and hyphens")
    })
});

const usernameValidationSchema = z.object({
    query: z.object({
        username: z.string({ message: "Username is required!" }).min(1, "Username cannot be empty")
    }).passthrough()
});

const displayNameUpdateValidationSchema = z.object({
    body: z.object({
        displayName: z.string({ message: "Display name is required!" }).min(3, "Display name must be at least 3 characters long").regex(nameRegex, "Display name can only contain letters, numbers, underscores and hyphens")
    })
});

export {
    usersQueryValidationSchema,
    userInfoUpdateValidationSchema,
    changePasswordValidationSchema,
    userIdValidationSchema,
    displayNameValidationSchema,
    usernameValidationSchema,
    displayNameUpdateValidationSchema
}

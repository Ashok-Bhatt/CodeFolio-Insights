import z from "zod";
import { apiKeyRegex } from "../constants/index.js"

const currentYear = new Date().getFullYear();

const yearQueryValidationSchema = z.object({
    query: z.object({
        year: z.string().optional().transform(v => parseInt(v) || currentYear)
    }).passthrough()
});

const usernameAndYearQueryValidationSchema = z.object({
    query: z.object({
        username: z.string({ message: "Username is required!" }).min(1, "Username cannot be empty"),
        year: z.string().optional().transform(v => parseInt(v) || currentYear)
    }).passthrough()
});

const yearAndMonthQueryValidationSchema = z.object({
    query: z.object({
        year: z.string().optional().transform(v => parseInt(v) || currentYear),
        month: z.string().optional().transform(v => parseInt(v) || (new Date().getMonth() + 1))
    }).passthrough()
});

const paginationQueryValidationSchema = z.object({
    query: z.object({
        limit: z.string().optional().transform(v => parseInt(v) || 10),
        page: z.string().optional().transform(v => parseInt(v) || 1)
    }).passthrough()
});

const institutionQueryValidationSchema = z.object({
    query: z.object({
        institution: z.string({ message: "Institution name is required!" }).min(1, "Institution name cannot be empty")
    }).passthrough()
});

const recentSubmissionsValidationSchema = z.object({
    query: z.object({
        username: z.string({ message: "Username is required!" }).min(1, "Username cannot be empty"),
        limit: z.string().optional().transform(v => parseInt(v) || 10),
    }).passthrough()
});

const apiKeyBodyValidationSchema = z.object({
    body: z.object({
        apiKey: z.string({ message: "API Key is required!" }).regex(apiKeyRegex, "Invalid API Key"),
    })
});

export {
    yearQueryValidationSchema,
    usernameAndYearQueryValidationSchema,
    yearAndMonthQueryValidationSchema,
    paginationQueryValidationSchema,
    institutionQueryValidationSchema,
    recentSubmissionsValidationSchema,
    apiKeyBodyValidationSchema,
};

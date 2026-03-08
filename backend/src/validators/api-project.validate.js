import z from "zod";
import { objectIdRegex } from "../constants/index.js";

const projectIdValidationSchema = z.object({
    params: z.object({
        projectId: z.string({ message: "Project ID is required!" }).regex(objectIdRegex, "Invalid project ID format.")
    })
});

const projectNameBodySchema = z.object({
    body: z.object({
        name: z.string({ message: "Project name is required!" }).min(1, "Project name cannot be empty!")
    })
});

const projectIdAndNameBodySchema = z.object({
    body: z.object({
        projectId: z.string({ message: "Project ID is required!" }).regex(objectIdRegex, "Invalid project ID format."),
        name: z.string({ message: "Project name is required!" }).min(1, "Project name cannot be empty!")
    })
});

const apiKeyPointsLimitValidationSchema = z.object({
    body: z.object({
        projectId: z.string({ message: "Project ID is required!" }).regex(objectIdRegex, "Invalid project ID format."),
        newApiPointsDailyLimit: z.coerce.number({ message: "New API Points Limit is required!" })
    })
})

export {
    projectIdValidationSchema,
    projectNameBodySchema,
    projectIdAndNameBodySchema,
    apiKeyPointsLimitValidationSchema,
}
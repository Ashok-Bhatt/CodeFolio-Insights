import z from "zod";
import { apiKeyRegex } from "../constants/index.js";

const apiKeyDailyUsageValidationSchema = z.object({
  query: z.object({
    apiKey: z
      .string({ message: "API Key is required!" })
      .regex(apiKeyRegex, "Invalid API Key"),

    lastDays: z
      .coerce
      .number({ message: "Last days is required!" })
      .min(1, "Last days cannot be less than 1!")
      .max(30, "Last days cannot be more than 30!")
      .default(1),
  }).passthrough()
});

const apiKeyRequestsDataValidationSchema = z.object({
  query: z.object({
    apiKey: z
      .string({ message: "API Key is required!" })
      .regex(apiKeyRegex, "Invalid API Key"),

    previousInterval: z
      .coerce
      .number({ message: "Previous interval is required!" })
      .min(60 * 1000, "Previous interval cannot be less than 1 minute!")
      .max(
        30 * 24 * 60 * 60 * 1000,
        "Previous interval cannot be more than 30 days!"
      )
      .default(30 * 24 * 60 * 60 * 1000),
  }).passthrough()
});

export {
  apiKeyDailyUsageValidationSchema,
  apiKeyRequestsDataValidationSchema
};
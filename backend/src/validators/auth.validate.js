import z from "zod";

const signupValidationSchema = z.object({
    body: z.object({
        name: z.string().min(3, "Name must be at least 3 characters long"),
        email: z.string().email("Invalid email address"),
        password: z.string().min(6, "Password must be at least 6 characters long"),
    })
});

const loginValidationSchema = z.object({
    body: z.object({
        email: z.string().email("Invalid email address"),
        password: z.string().min(6, "Password must be at least 6 characters long"),
    })
});

const otpValidationSchema = z.object({
    body: z.object({
        otp: z.string().length(6, "Length of otp should be 6"),
    })
})

export {
    signupValidationSchema,
    loginValidationSchema,
    otpValidationSchema,
}
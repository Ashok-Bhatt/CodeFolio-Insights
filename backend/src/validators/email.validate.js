import z from "zod";

const contactFormValidationSchema = z.object({
    body: z.object({
        name: z.string().min(2, "Name must be at least 2 characters long"),
        email: z.string().email("Invalid email address"),
        subject: z.string().min(5, "Subject must be at least 5 characters long"),
        message: z.string().min(10, "Message must be at least 10 characters long"),
    })
});

export {
    contactFormValidationSchema
};

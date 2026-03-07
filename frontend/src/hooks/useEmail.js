import { axiosInstance, asyncWrapper } from "../api/export.js";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useContactUs = () => {
    return useMutation({
        mutationFn: asyncWrapper(async (contactData) => {
            const response = await axiosInstance.post("/api/email/contact-us", contactData);
            return response.data;
        }),
        onSuccess: () => {
            toast.success("Message sent successfully!");
        },
        onError: (error) => {
            toast.error(error.message || "Failed to send message");
        },
    });
};

export { useContactUs };

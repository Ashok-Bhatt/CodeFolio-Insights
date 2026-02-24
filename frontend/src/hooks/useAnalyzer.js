import { axiosInstance, asyncWrapper } from "../api/export.js";
import { useMutation, useQuery } from "@tanstack/react-query"

// LeetCode hook
const useLeetcodeAnalysis = (username) => {
    return useQuery({
        queryKey: ["leetcodeData", username],
        queryFn: asyncWrapper(async () => {
            const response = await axiosInstance.get(`/analyze/leetcode?username=${username}`);
            return response.data;
        }),
        enabled: false, // prevents auto-fetch until Analyze is clicked
        retry: false,
    });
}

// GitHub hook
const useGithubAnalysis = (username) => {
    return useQuery({
        queryKey: ["githubData", username],
        queryFn: asyncWrapper(async () => {
            const response = await axiosInstance.get(`/analyze/github?username=${username}`);
            return response.data;
        }),
        enabled: false, // Prevents auto-fetch until Analyze is clicked
        retry: false,
    });
}

// Resume hook
const useResumeAnalysis = () => {
    return useMutation({
        mutationFn: asyncWrapper(async (formData) => {
            const response = await axiosInstance.post("/analyze/resume", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        }),
    });
}

export {
    useLeetcodeAnalysis,
    useGithubAnalysis,
    useResumeAnalysis,
};
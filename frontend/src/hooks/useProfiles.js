import { axiosInstance, asyncWrapper } from "../api/export.js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

// Hook for Cache
const useProfileCache = (userId) => {
    return useQuery({
        queryKey: ["profileCache", userId],
        queryFn: asyncWrapper(async () => {
            const response = await axiosInstance.get(`/profile/cache/${userId}`);
            return response.data;
        }),
        enabled: !!userId,
        retry: false,
        staleTime: 0,
    });
}

// Hook for Refresh
const useProfileRefresh = (userId) => {
    return useQuery({
        queryKey: ["profileRefresh", userId],
        queryFn: asyncWrapper(async () => {
            const response = await axiosInstance.get(`/profile/fetch/${userId}`);
            return response.data;
        }),
        enabled: false,
        retry: false,
    });
}

// Hook for general profile data
const useProfileLinks = (userId) => {
    return useQuery({
        queryKey: ["profileLinks", userId],
        queryFn: asyncWrapper(async () => {
            const response = await axiosInstance.get(`/profile/${userId}`);
            return response.data;
        }),
        enabled: !!userId,
        retry: false,
    });
};


const useUpdateProfileLink = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: asyncWrapper(async ({ platformName, platformUsername }) => {
            const response = await axiosInstance.patch('/profile/platform', {}, {
                params: { platformName, platformUsername }
            });
            return response.data;
        })
    });
};

export {
    useProfileCache,
    useProfileRefresh,
    useProfileLinks,
    useUpdateProfileLink,
};

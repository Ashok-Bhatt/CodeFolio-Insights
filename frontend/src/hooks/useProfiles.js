import { axiosInstance, asyncWrapper } from "../api/export.js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

// Hook for Cache
export const useProfileCache = (userId) => {
    return useQuery({
        queryKey: ["profileCache", userId],
        queryFn: asyncWrapper(async () => {
            const response = await axiosInstance.get(`/profiles/cache/${userId}`);
            return response.data;
        }),
        enabled: !!userId,
        retry: false,
        staleTime: 0,
    });
}

// Hook for Refresh
export const useProfileRefresh = (userId) => {
    return useQuery({
        queryKey: ["profileRefresh", userId],
        queryFn: asyncWrapper(async () => {
            const response = await axiosInstance.get(`/profiles/fetch/${userId}`);
            return response.data;
        }),
        enabled: false,
        retry: false,
    });
}

// Hook for general profile data
export const useProfileLinks = (userId) => {
    return useQuery({
        queryKey: ["profileLinks", userId],
        queryFn: asyncWrapper(async () => {
            const response = await axiosInstance.get(`/profiles/${userId}`);
            return response.data;
        }),
        enabled: !!userId,
        retry: false,
    });
};


export const useUpdateProfileLink = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: asyncWrapper(async ({ platformName, platformUsername }) => {
            const response = await axiosInstance.patch('/profiles/platform', {}, {
                params: { platformName, platformUsername }
            });
            return response.data;
        }),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(['profileLinks']);
        }
    });
};

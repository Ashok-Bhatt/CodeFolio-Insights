import { axiosInstance, asyncWrapper } from "../api/export.js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

// Hook for Cache
const useProfileCache = (userId) => {
    return useQuery({
        queryKey: ["profileCache", userId],
        queryFn: asyncWrapper(async () => {
            const response = await axiosInstance.get(`/api/profile/cache/${userId}`);
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
            const response = await axiosInstance.get(`/api/profile/fetch/${userId}`);
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
            const response = await axiosInstance.get(`/api/profile/${userId}`);
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
            const response = await axiosInstance.patch('/api/profile/platform', {}, {
                params: { platformName, platformUsername }
            });
            return response.data;
        }),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(['profileLinks']);
            const platform = variables.platformName;
            toast.success(`${platform.charAt(0).toUpperCase() + platform.slice(1)} link updated successfully!`);
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Couldn't update the link");
        }
    });
};

export {
    useProfileCache,
    useProfileRefresh,
    useProfileLinks,
    useUpdateProfileLink,
};

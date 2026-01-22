import { axiosInstance, asyncWrapper } from "../api/export.js";
import { useMutation, useQuery } from "@tanstack/react-query"

const useCheckAuth = () => {
    return useQuery({
        queryKey: ["checkAuth"],
        retry: 3,
        queryFn: asyncWrapper(async () => {
            const response = await axiosInstance.get("/auth/check", { withCredentials: true });
            return response.data;
        })
    })
}

const useLogin = () => {
    return useMutation({
        mutationFn: asyncWrapper(async (formData) => {
            const response = await axiosInstance.post("/auth/login", formData);
            return response.data;
        }),
        retry: 3,
    })
}

const useSignUp = () => {
    return useMutation({
        mutationFn: asyncWrapper(async (formData) => {
            const response = await axiosInstance.post("/auth/signup", formData);
            return response.data;
        }),
        retry: 3,
    })
}

const useUser = (id) => {
    return useQuery({
        queryKey: ["user", id],
        retry: 3,
        queryFn: asyncWrapper(async () => {
            const response = await axiosInstance.get(`/user/${id}`);
            return response.data;
        }),
        enabled: !!id,
    })
}

const useUpdateUser = () => {
    return useMutation({
        mutationFn: asyncWrapper(async (formData) => {
            const response = await axiosInstance.patch("/user", formData);
            return response.data;
        }),
    })
}

const useChangePassword = () => {
    return useMutation({
        mutationFn: asyncWrapper(async (passwordData) => {
            const response = await axiosInstance.patch("/user/password", passwordData);
            return response.data;
        }),
    })
}

// Obsolete useUpdateLastRefresh removed as per backend refactor

const useLogout = () => {
    return useMutation({
        mutationFn: asyncWrapper(async () => {
            const response = await axiosInstance.post("/auth/logout", {});
            return response.data;
        }),
    })
}

const useUsers = (params) => {
    return useQuery({
        queryKey: ["users", params],
        queryFn: asyncWrapper(async () => {
            const response = await axiosInstance.get("/user", { params });
            return response.data;
        }),
        retry: false,
    })
}

// Obsolete useAddProfileView removed as per backend refactor

const useToggleProfileVisibility = () => {
    return useMutation({
        mutationFn: asyncWrapper(async () => {
            const response = await axiosInstance.patch("/user/visibility", {});
            return response.data;
        }),
    })
}

export {
    useCheckAuth,
    useLogin,
    useSignUp,
    useUser,
    useUpdateUser,
    useChangePassword,
    useLogout,
    useUsers,
    useToggleProfileVisibility,
};
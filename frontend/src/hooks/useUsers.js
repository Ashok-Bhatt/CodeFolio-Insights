import { axiosInstance, asyncWrapper } from "../api/export.js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import useAuthStore from "../store/useAuthStore.js";
import toast from "react-hot-toast";

const useCheckAuth = () => {
    return useQuery({
        queryKey: ["checkAuth"],
        retry: 3,
        queryFn: asyncWrapper(async () => {
            const response = await axiosInstance.get("/auth/check");
            if (response.data) {
                useAuthStore.setState({ user: response.data.user, token: response.data.token });
            }
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
        onSuccess: (data) => {
            useAuthStore.setState({ user: data.user, token: data.token });
            toast.success("Login successful");
        },
        onError: (err) => {
            toast.error(err.response?.data?.message || "Login failed");
        },
        retry: 3,
    })
}

const useSignUp = () => {
    return useMutation({
        mutationFn: asyncWrapper(async (formData) => {
            const response = await axiosInstance.post("/auth/signup", formData);
            return response.data;
        }),
        onSuccess: (data) => {
            useAuthStore.setState({ user: data.user, token: data.token });
            toast.success(data.message || "Signup successful");
        },
        onError: (err) => {
            toast.error(err.response?.data?.message || "Signup failed");
        },
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
            const response = await axiosInstance.patch("/user", formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return response.data;
        })
    })
}

const useChangePassword = () => {
    return useMutation({
        mutationFn: asyncWrapper(async (passwordData) => {
            const response = await axiosInstance.patch("/user/password", passwordData);
            return response.data;
        })
    })
}

const useLogout = () => {
    return useMutation({
        mutationFn: asyncWrapper(async () => {
            const response = await axiosInstance.post("/auth/logout", {});
            return response.data;
        }),
        onSuccess: () => {
            useAuthStore.setState({ user: null, token: null });
            localStorage.removeItem("preference-storage");
        }
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

const useToggleProfileVisibility = () => {
    return useMutation({
        mutationFn: asyncWrapper(async () => {
            const response = await axiosInstance.patch("/user/visibility", {});
            return response.data;
        })
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
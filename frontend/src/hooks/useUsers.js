import { axiosInstance, asyncWrapper } from "../api/export.js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import useAuthStore from "../store/useAuthStore.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

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
        })
    })
}

const useSignUp = () => {
    return useMutation({
        mutationFn: asyncWrapper(async (formData) => {
            const response = await axiosInstance.post("/auth/signup", formData);
            return response.data;
        })
    })
}

const useVerifyOTP = () => {
    return useMutation({
        mutationFn: asyncWrapper(async (otpData) => {
            const response = await axiosInstance.post("/auth/verify-otp", otpData);
            return response.data;
        })
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

const useToggle2FA = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: asyncWrapper(async () => {
            const response = await axiosInstance.patch("/user/2fa", {});
            return response.data;
        }),
        onSuccess: (data) => {
            queryClient.invalidateQueries(['authUser']);
            toast.success(data.message);
        },
        onError: (error) => {
            toast.error(error.message || "Failed to toggle 2FA");
        }
    });
};

const useLogout = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: asyncWrapper(async () => {
            const response = await axiosInstance.post("/auth/logout", {});
            return response.data;
        }),
        onSuccess: () => {
            useAuthStore.setState({ user: null, token: null });
            localStorage.removeItem("preference-storage");
            navigate('/login');
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

const useUpdateApiKey = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: asyncWrapper(async (apiKeyData) => {
            const response = await axiosInstance.patch("/user/api-key", apiKeyData);
            return response.data;
        }),
        onSuccess: (data) => {
            queryClient.invalidateQueries(['checkAuth']);
            useAuthStore.setState((state) => ({ user: { ...state.user, apiKey: data.apiKey } }));
            toast.success(data.message || "API Key updated successfully!");
        },
        onError: (error) => {
            toast.error(error.message || "Failed to update API Key");
        }
    });
};

export {
    useCheckAuth,
    useLogin,
    useSignUp,
    useVerifyOTP,
    useUser,
    useUpdateUser,
    useChangePassword,
    useToggle2FA,
    useLogout,
    useUsers,
    useToggleProfileVisibility,
    useUpdateApiKey,
};
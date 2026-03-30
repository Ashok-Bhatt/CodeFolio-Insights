import { axiosInstance, asyncWrapper } from "../api/export.js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useAuthStore } from "../store/export.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useCheckAuth = () => {
    return useQuery({
        queryKey: ["checkAuth"],
        retry: 3,
        queryFn: asyncWrapper(async () => {
            const response = await axiosInstance.get("/api/auth/check");
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
            const response = await axiosInstance.post("/api/auth/login", formData);
            return response.data;
        }),
        onSuccess: (data) => {
            if (!data.requires2FA) {
                useAuthStore.setState({ user: data.user, token: data.token });
                toast.success("Login successful");
            } else {
                toast.success(data.message);
            }
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Login failed");
        }
    })
}

const useSignUp = () => {
    return useMutation({
        mutationFn: asyncWrapper(async (formData) => {
            const response = await axiosInstance.post("/api/auth/signup", formData);
            return response.data;
        }),
        onSuccess: (data) => {
            if (!data.requires2FA) {
                useAuthStore.setState({ user: data.user, token: data.token });
                toast.success("Signup successful");
            } else {
                toast.success(data.message);
            }
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Signup failed");
        }
    })
}

const useVerifyOTP = () => {
    return useMutation({
        mutationFn: asyncWrapper(async (otpData) => {
            const response = await axiosInstance.post("/api/auth/verify-otp", otpData);
            return response.data;
        }),
        onSuccess: (data) => {
            useAuthStore.setState({ user: data.user, token: data.token });
            toast.success(data.message || "Verification successful");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Verification failed");
        }
    })
}

const useUser = (id) => {
    return useQuery({
        queryKey: ["user", id],
        retry: 3,
        queryFn: asyncWrapper(async () => {
            const response = await axiosInstance.get(`/api/user/${id}`);
            return response.data;
        }),
        enabled: !!id,
    })
}

const useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: asyncWrapper(async (formData) => {
            const response = await axiosInstance.patch("/api/user", formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return response.data;
        }),
        onSuccess: (data) => {
            queryClient.invalidateQueries(['checkAuth']);
            useAuthStore.setState({ user: data });
            toast.success("Profile updated successfully!");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to update profile");
        }
    })
}

const useChangePassword = () => {
    return useMutation({
        mutationFn: asyncWrapper(async (passwordData) => {
            const response = await axiosInstance.patch("/api/user/password", passwordData);
            return response.data;
        }),
        onSuccess: (data) => {
            toast.success(data.message || "Password updated successfully!");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to update password");
        }
    })
}

const useToggle2FA = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: asyncWrapper(async () => {
            const response = await axiosInstance.patch("/api/user/2fa", {});
            return response.data;
        }),
        onSuccess: (data) => {
            queryClient.invalidateQueries(['authUser']);
            toast.success(data.message);
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to toggle 2FA");
        }
    });
};

const useLogout = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: asyncWrapper(async () => {
            const response = await axiosInstance.post("/api/auth/logout", {});
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
            const response = await axiosInstance.get("/api/user", { params });
            return response.data;
        }),
        retry: false,
    })
}

const useToggleProfileVisibility = () => {
    return useMutation({
        mutationFn: asyncWrapper(async () => {
            const response = await axiosInstance.patch("/api/user/visibility", {});
            return response.data;
        }),
        onSuccess: (data) => {
            toast.success(data.message || "Visibility updated!");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to update visibility");
        }
    })
}

const useUpdateApiKey = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: asyncWrapper(async (apiKeyData) => {
            const response = await axiosInstance.patch("/api/user/api-key", apiKeyData);
            return response.data;
        }),
        onSuccess: (data) => {
            queryClient.invalidateQueries(['checkAuth']);
            useAuthStore.setState((state) => ({ user: { ...state.user, apiKey: data.apiKey } }));
            toast.success(data.message || "API Key updated successfully!");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to update API Key");
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
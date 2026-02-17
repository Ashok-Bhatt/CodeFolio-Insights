import { create } from "zustand";
import { persist } from "zustand/middleware";
import axiosInstance from "../api/axiosInstance.js";
import conf from "../config/config.js";
import toast from "react-hot-toast";

const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            user: null,
            token: null,

            login: async (formData) => {
                try {
                    const response = await axiosInstance.post(`${conf.SERVER_BASE_URL}/auth/login`, JSON.stringify(formData), { withCredentials: true });
                    const data = response.data;

                    set({ user: data.user, token: data.token });
                } catch (err) {
                    console.error('Server error:', err);
                    toast.error(err.response?.data?.message || "Login failed");
                }
            },

            signup: async (formData) => {
                try {
                    const response = await axiosInstance.post(`${conf.SERVER_BASE_URL}/auth/signup`, JSON.stringify(formData), { withCredentials: true });
                    const data = response.data;

                    set({ user: data.user, token: data.token });
                    toast.success(data.message);
                } catch (err) {
                    console.error('Server error:', err);
                    toast.error(err.response?.data?.message || "Signup failed");
                }
            },


            logout: async () => {
                try {
                    const response = await axiosInstance.post(`${conf.SERVER_BASE_URL}/auth/logout`, {}, { withCredentials: true });
                    localStorage.removeItem("loggedInUser");
                    set({ user: null, token: null });
                } catch (err) {
                    console.error('Server error:', err);
                }
            },

            checkAuth: async () => {
                try {
                    const response = await axiosInstance.get(`${conf.SERVER_BASE_URL}/auth/check`, { withCredentials: true });
                    const data = response.data;
                    set({ user: data.user, token: data.token });
                } catch (err) {
                    console.error('Server error:', err);
                }
            },

            setUser: (user) => set({ user }),
        }),
        {
            name: "loggedInUser"
        }
    )
);

export default useAuthStore;
import { axiosInstance, asyncWrapper } from "../api/export.js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useProjects = () => {
    return useQuery({
        queryKey: ["projects"],
        queryFn: asyncWrapper(async () => {
            const response = await axiosInstance.get("/api/project/all");
            return response.data;
        }),
    });
};

const useCreateProject = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: asyncWrapper(async (projectData) => {
            const response = await axiosInstance.post("/api/project", projectData);
            return response.data;
        }),
        onSuccess: () => {
            queryClient.invalidateQueries(["projects"]);
            toast.success("Project created successfully!");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to create project");
        },
    });
};

const useUpdateProject = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: asyncWrapper(async ({ id, projectData }) => {
            const response = await axiosInstance.patch(`/api/project/${id}`, projectData);
            return response.data;
        }),
        onSuccess: () => {
            queryClient.invalidateQueries(["projects"]);
            toast.success("Project updated successfully!");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to update project");
        },
    });
};

const useDeleteProject = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: asyncWrapper(async (id) => {
            const response = await axiosInstance.delete(`/api/project/${id}`);
            return response.data;
        }),
        onSuccess: () => {
            queryClient.invalidateQueries(["projects"]);
            toast.success("Project deleted successfully!");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to delete project");
        },
    });
};

export {
    useProjects,
    useCreateProject,
    useUpdateProject,
    useDeleteProject,
};

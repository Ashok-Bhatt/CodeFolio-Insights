import ApiProjectModel from "../models/api-project.model.js";
import { generateApiKey } from "../utils/api-key.util.js";
import mongoose from "mongoose";

const getProjects = async (userId) => {
    const projects = await ApiProjectModel
        .find({ userId })
        .sort({ createdAt: -1 })
        .select("-userId -__v");

    return projects;
};

const getProjectById = async (projectId, userId) => {
    const project = await ApiProjectModel.findOne({ _id: projectId, userId });
    return project;
};

const createProject = async (name, userId) => {
    const newProject = new ApiProjectModel({
        name,
        userId,
        apiKey: generateApiKey(),
    });

    await newProject.save();
    return newProject;
};

const updateProject = async (projectId, name, userId) => {
    const project = await ApiProjectModel.findOneAndUpdate(
        { _id: projectId, userId },
        { name },
        { new: true, runValidators: true }
    );

    return project;
};

const deleteProject = async (projectId, userId, defaultApiKey) => {
    const project = await ApiProjectModel.findOne({ _id: projectId, userId });
    if (!project) throw new Error("Project not found or unauthorized");
    if (project.apiKey === defaultApiKey) throw new Error("Cannot delete default API key project");

    await ApiProjectModel.findByIdAndDelete(projectId);
    return project;
};

const changeDailyApiLimit = async (projectId, newApiPointsDailyLimit) => {
    const project = await ApiProjectModel.findById(new mongoose.Types.ObjectId(projectId));
    if (!project) throw new Error("Project not found!");

    project.apiPointsDailyLimit = newApiPointsDailyLimit;
    await project.save();
    return project;
};

const getUserProjects = async (userId) => {
    const projects = await ApiProjectModel.find({ userId }).sort({ createdAt: -1 }).select("-userId -__v");
    return projects;
};

export {
    getProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
    changeDailyApiLimit,
    getUserProjects,
};
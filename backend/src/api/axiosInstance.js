import axios from 'axios';
import { GITHUB_TOKEN } from '../config/env.config.js';

// GitHub Instance
const githubAPI = axios.create({
    baseURL: "https://api.github.com",
    headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
    }
})

// GitHub Helper function for GraphQL queries
const githubGraphQlQuery = async (query, variables = {}) => {
    try {
        const response = await githubAPI.post("/graphql", {
            query,
            variables
        });

        return response.data;
    } catch (error) {
        console.log("Error occurred: ", error.message);
        console.log(error.stack);
        return null;
    }
}

// GitHub Helper function for RestAPI queries
const githubRestApiQuery = async (endpoint) => {
    try {
        const response = await githubAPI.get(endpoint);
        return response.data;
    } catch (error) {
        console.log("Error occurred: ", error.message);
        console.log(error.stack);
        return null;
    }
}

export {
    githubAPI,
    githubGraphQlQuery,
    githubRestApiQuery,
}
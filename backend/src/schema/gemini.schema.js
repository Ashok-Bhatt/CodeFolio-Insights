import { Type } from "@google/genai";

const simpleAnalysisSchema = {
    type: Type.OBJECT,
    properties: {
        score: { type: Type.INTEGER },
        analysis: {
            type: Type.ARRAY,
            items: { type: Type.STRING, }
        },
    },
    required: ["score", "analysis"],
}

const complexAnalysisSchema = {
    type: Type.OBJECT,
    properties: {
        score: { type: Type.INTEGER },
        analysis: {
            type: Type.ARRAY,
            items: { type: Type.STRING, }
        },
        pointAnalysis: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    point: {
                        type: Type.OBJECT,
                        properties: {
                            original: { type: Type.STRING },
                            refactored: { type: Type.STRING },
                        },
                        required: ["original", "refactored"],
                    },
                    score: { type: Type.INTEGER },
                    analysis: { type: Type.STRING },
                },
                required: ["point", "score", "analysis"],
            }
        },
    },
    required: ["score", "analysis", "pointAnalysis"],
}

const simpleListSchema = {
    type: Type.ARRAY,
    items: { type: Type.STRING, }
}

const jobDescriptionSchema = {
    type: Type.OBJECT,
    properties: {
        score: { type: Type.INTEGER },
        analysis: {
            type: Type.ARRAY,
            items: { type: Type.STRING, }
        },
        isJobDescriptionGiven: {
            type: Type.BOOLEAN,
        },
        keywordsPresent: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
        },
        keywordsAbsent: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
        },
    },
    required: ["score", "analysis", "isJobDescriptionGiven", "keywordsPresent", "keywordsAbsent"],
};

const videoSchema = {
    type: Type.OBJECT,
    properties: {
        link: {
            type: Type.STRING
        },
        title: {
            type: Type.STRING
        },
        description: {
            type: Type.STRING
        },
        time: {
            type: Type.NUMBER
        },
        views: {
            type: Type.NUMBER
        },
    },
    required: ["link", "title", "description", "time", "views"]
}

const profileAnalysisSchema = {
    type: Type.OBJECT,
    properties: {
        analysis: {
            type: Type.ARRAY,
            items: { type: Type.STRING, }
        },
        strongPoints: {
            type: Type.ARRAY,
            items: { type: Type.STRING, }
        },
        improvementAreas: {
            type: Type.ARRAY,
            items: { type: Type.STRING, }
        },
        video: videoSchema
    },
    required: ["analysis", "strongPoints", "improvementAreas", "video"],
}

const resumeAnalysisSchema = {
    type: Type.OBJECT,
    properties: {
        scoreAnalysis: {
            type: Type.OBJECT,
            properties: {
                resumeLength: simpleAnalysisSchema,
                impact: simpleAnalysisSchema,
                professionalism: simpleAnalysisSchema,
                logicalFlow: simpleAnalysisSchema,
                section: {
                    type: Type.OBJECT,
                    properties: {
                        contact: simpleAnalysisSchema,
                        coursework: simpleAnalysisSchema,
                        education: simpleAnalysisSchema,
                        projects: complexAnalysisSchema,
                        achievements: complexAnalysisSchema,
                        technicalSkills: simpleAnalysisSchema,
                        experience: complexAnalysisSchema,
                    },
                    required: ["contact", "coursework", "education", "projects", "achievements", "technicalSkills", "experience"],
                },
                jobDescription: jobDescriptionSchema,
            },
            required: ["resumeLength", "impact", "professionalism", "logicalFlow", "section", "jobDescription"],
        },
        strengths: simpleListSchema,
        weaknesses: simpleListSchema,
        improvements: simpleListSchema,
    },
    required: ["scoreAnalysis", "strengths", "weaknesses", "improvements"],
}

export {
    simpleAnalysisSchema,
    complexAnalysisSchema,
    simpleListSchema,
    jobDescriptionSchema,
    videoSchema,
    profileAnalysisSchema,
    resumeAnalysisSchema,
}
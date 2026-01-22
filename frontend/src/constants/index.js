import { Github, Linkedin, Code2, FileText, LayoutDashboard, Sparkles } from "lucide-react";

export const LANGUAGE_COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#6366f1', '#ef4444', '#a21caf', '#14b8a6', '#eab308', '#64748b', '#db2777', '#0ea5e9', '#22d3ee'];

export const ALLOWED_FILE_TYPES = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];

export const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const PLATFORMS_CONFIG = [
    { value: 'leetcode', label: 'LeetCode', color: 'from-orange-500 to-orange-600', placeholder: 'leetcode_username' },
    { value: 'github', label: 'GitHub', color: 'from-gray-700 to-gray-900', placeholder: 'github_username' },
    { value: 'gfg', label: 'GeeksForGeeks', color: 'from-green-500 to-green-600', placeholder: 'geeksforgeeks_username' },
    { value: 'hackerrank', label: 'HackerRank', color: 'from-green-400 to-green-500', placeholder: 'hackerrank_username' },
    { value: 'codechef', label: 'CodeChef', color: 'from-yellow-600 to-yellow-700', placeholder: 'codechef_username' },
    { value: 'code360', label: 'Code360', color: 'from-blue-700 to-blue-900', placeholder: 'code360_username' },
    { value: 'interviewbit', label: 'InterviewBit', color: 'from-blue-700 to-blue-900', placeholder: 'interviewbit_username' },
];

export const DEFAULT_USERS = [
    { name: "Alex", profile: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=100" },
    { name: "Sarah", profile: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" },
    { name: "James", profile: "https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?w=100" }
];

export const LANDING_FEATURES = [
    {
        icon: Github,
        title: "GitHub Analysis",
        description:
            "Analyze your repository contributions, code quality, and project diversity to showcase your development expertise.",
        items: [
            "Contribution patterns",
            "Language proficiency",
            "Project impact assessment",
        ],
    },
    {
        icon: Linkedin,
        title: "LinkedIn Optimization",
        description:
            "Enhance your professional profile with insights on network growth, engagement metrics, and keyword optimization.",
        items: [
            "Profile completeness score",
            "Network quality analysis",
            "Skill endorsement strategy",
        ],
    },
    {
        icon: Code2,
        title: "Coding Platforms",
        description:
            "Track your problem-solving progress across LeetCode, GeeksForGeeks, and other competitive programming platforms.",
        items: [
            "Problem-solving patterns",
            "Difficulty progression",
            "Skill gap identification",
        ],
    },
    {
        icon: FileText,
        title: "Resume Analysis",
        description:
            "Get detailed feedback on your resume with keyword optimization, ATS compatibility, and content suggestions.",
        items: [
            "ATS score and optimization",
            "Industry-specific improvements",
            "Impact statement enhancement",
        ],
    },
    {
        icon: LayoutDashboard,
        title: "Unified Dashboard",
        description:
            "Access all your profile metrics in one comprehensive dashboard with progress tracking and goal setting.",
        items: [
            "Cross-platform analytics",
            "Progress visualization",
            "Customizable widgets",
        ],
    },
    {
        icon: Sparkles,
        title: "AI Recommendations",
        description:
            "Receive personalized career advice and skill development recommendations based on your complete profile analysis.",
        items: [
            "Skill gap analysis",
            "Career path suggestions",
            "Learning resource curation",
        ],
    },
];

export const HACKERRANK_ICONS = {
    "Problem Solving" : "https://hrcdn.net/fcore/assets/badges/problem-solving-ecaf59a612.svg",
    "C++" : "https://hrcdn.net/fcore/assets/badges/cpp-739b350881.svg",
    "Java" : "https://hrcdn.net/fcore/assets/badges/java-9d05b1f559.svg",
    "Python" : "https://hrcdn.net/fcore/assets/badges/python-f70befd824.svg",
    "30 Days of Code" : "https://hrcdn.net/fcore/assets/badges/30-days-of-code-a772ae4c2f.svg",
    "10 Days of JS" : "https://hrcdn.net/fcore/assets/badges/10-days-of-javascript-94ff22d1c9.svg",
    "10 Days of Statistics" : "https://hrcdn.net/fcore/assets/badges/10-days-of-statistics-94ff22d1c9.svg",
    "Sql" : "https://hrcdn.net/fcore/assets/badges/sql-89e76e7082.svg",
    "C" : "https://hrcdn.net/fcore/assets/badges/c-d1985901e6.svg",
    "Ruby" : "https://hrcdn.net/fcore/assets/badges/ruby-b2c8eababe.svg",
    "default" : "/Images/Default/badge.png",
}
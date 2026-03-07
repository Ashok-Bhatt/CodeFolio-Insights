import conf from "../config/config.js";

const { SERVER_BASE_URL } = conf;

export const documentationData = [
    {
        category: "GFG",
        endpoints: [
            {
                title: "User Info",
                description: [
                    "Fetches user profile and progress from GeeksforGeeks like total problems solved, streaks, coding score, institution rank, avatar, etc.",
                ],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-100" },
                    url: SERVER_BASE_URL + "/api/platform/gfg/user/profile",
                },
                parameters: [
                    { name: "user", type: "String", example: "ashokbhacjou", description: "GFG username", status: "required" },
                    { name: "apiKey", type: "String", example: "your-api-key", description: "Your API Key.", status: "required" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: SERVER_BASE_URL + "/api/platform/gfg/user/profile?user=&apiKey=",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point.",
            },
            {
                title: "Submission History",
                description: ["Fetches submission history for the user in the given year.", "If no year is provided, it fetches the submission history for the current year."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-100" },
                    url: SERVER_BASE_URL + "/api/platform/gfg/user/submissions",
                },
                parameters: [
                    { name: "user", type: "String", example: "ashokbhacjou", description: "GFG username", status: "required" },
                    { name: "apiKey", type: "String", example: "your-api-key", description: "Your API Key.", status: "required" },
                    { name: "year", type: "Number", example: "2024", description: "Year", status: "optional" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: SERVER_BASE_URL + "/api/platform/gfg/user/submissions?user=&apiKey=&year=",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point.",
            },
            {
                title: "User Problems Solved",
                description: ["Fetches the list of problems solved by the user on GFG as per the difficulty level."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-100" },
                    url: SERVER_BASE_URL + "/api/platform/gfg/user/problems",
                },
                parameters: [
                    { name: "user", type: "String", example: "ashokbhacjou", description: "GFG username", status: "required" },
                    { name: "apiKey", type: "String", example: "your-api-key", description: "Your API Key.", status: "required" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: SERVER_BASE_URL + "/api/platform/gfg/user/problems?user=&apiKey=",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point.",
            },
            {
                title: "Question of Today",
                description: ["Fetches the GeeksforGeeks problem of the day."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-100" },
                    url: SERVER_BASE_URL + "/api/platform/gfg/potd/today",
                },
                parameters: [
                    { name: "apiKey", type: "String", example: "your-api-key", description: "Your API Key.", status: "required" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: SERVER_BASE_URL + "/api/platform/gfg/potd/today?apiKey=",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point.",
            },
            {
                title: "Monthly POTDs",
                description: ["Fetches the list of POTDs for a specific month and year."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-100" },
                    url: SERVER_BASE_URL + "/api/platform/gfg/potd/monthly",
                },
                parameters: [
                    { name: "apiKey", type: "String", example: "your-api-key", description: "Your API Key.", status: "required" },
                    { name: "year", type: "Number", example: "2024", description: "Year", status: "optional" },
                    { name: "month", type: "Number", example: "12", description: "Month number (1-12)", status: "optional" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: SERVER_BASE_URL + "/api/platform/gfg/potd/monthly?apiKey=&year=&month=",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point.",
            },
        ],
    },
    {
        category: "LeetCode",
        endpoints: [
            {
                title: "User Profile",
                description: ["Fetches user profile and stats from LeetCode."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-100" },
                    url: SERVER_BASE_URL + "/api/platform/leetcode/user/profile",
                },
                parameters: [
                    { name: "user", type: "String", example: "ashokbhatt2048", description: "LeetCode username", status: "required" },
                    { name: "apiKey", type: "String", example: "your-api-key", description: "Your API Key.", status: "required" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: SERVER_BASE_URL + "/api/platform/leetcode/user/profile?user=&apiKey=",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point.",
            },
            {
                title: "Language Stats",
                description: ["Fetches language problem counts for the user."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-100" },
                    url: SERVER_BASE_URL + "/api/platform/leetcode/user/language-stats",
                },
                parameters: [
                    { name: "user", type: "String", example: "ashokbhatt2048", description: "LeetCode username", status: "required" },
                    { name: "apiKey", type: "String", example: "your-api-key", description: "Your API Key.", status: "required" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: SERVER_BASE_URL + "/api/platform/leetcode/user/language-stats?user=&apiKey=",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point.",
            },
            {
                title: "User Calendar",
                description: ["Fetches the user's calendar data (submission streaks, etc)."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-100" },
                    url: SERVER_BASE_URL + "/api/platform/leetcode/user/calendar",
                },
                parameters: [
                    { name: "user", type: "String", example: "ashokbhatt2048", description: "LeetCode username", status: "required" },
                    { name: "apiKey", type: "String", example: "your-api-key", description: "Your API Key.", status: "required" },
                    { name: "year", type: "Number", example: "2025", description: "The year for which heatmap is generated", status: "optional" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: SERVER_BASE_URL + "/api/platform/leetcode/user/calendar?user=&apiKey=&year=",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point.",
            },
            {
                title: "Recent Accepted Submissions",
                description: ["Fetches recent accepted submissions for the user."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-100" },
                    url: SERVER_BASE_URL + "/api/platform/leetcode/user/recent-submissions",
                },
                parameters: [
                    { name: "user", type: "String", example: "ashokbhatt2048", description: "LeetCode username", status: "required" },
                    { name: "apiKey", type: "String", example: "your-api-key", description: "Your API Key.", status: "required" },
                    { name: "limit", type: "Number", example: "10", description: "The number of submissions we want", status: "optional" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: SERVER_BASE_URL + "/api/platform/leetcode/user/recent-submissions?user=&apiKey=&limit=",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point.",
            },
            {
                title: "Badges",
                description: ["Fetches user badges from LeetCode."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-100" },
                    url: SERVER_BASE_URL + "/api/platform/leetcode/user/badges",
                },
                parameters: [
                    { name: "user", type: "String", example: "ashokbhatt2048", description: "LeetCode username", status: "required" },
                    { name: "apiKey", type: "String", example: "your-api-key", description: "Your API Key.", status: "required" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: SERVER_BASE_URL + "/api/platform/leetcode/user/badges?user=&apiKey=",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point.",
            },
            {
                title: "Contest Ranking",
                description: ["Fetches contest ranking for the user."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-100" },
                    url: SERVER_BASE_URL + "/api/platform/leetcode/user/contest-ranking",
                },
                parameters: [
                    { name: "user", type: "String", example: "ashokbhatt2048", description: "LeetCode username", status: "required" },
                    { name: "apiKey", type: "String", example: "your-api-key", description: "Your API Key.", status: "required" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: SERVER_BASE_URL + "/api/platform/leetcode/user/contest-ranking?user=&apiKey=",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point.",
            },
            {
                title: "Skill Stats",
                description: ["Fetches skill stats for the user."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-100" },
                    url: SERVER_BASE_URL + "/api/platform/leetcode/user/skill-stats",
                },
                parameters: [
                    { name: "user", type: "String", example: "ashokbhatt2048", description: "LeetCode username", status: "required" },
                    { name: "apiKey", type: "String", example: "your-api-key", description: "Your API Key.", status: "required" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: SERVER_BASE_URL + "/api/platform/leetcode/user/skill-stats?user=&apiKey=",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point.",
            },
            {
                title: "Question Progress",
                description: ["Fetches question progress for the user."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-100" },
                    url: SERVER_BASE_URL + "/api/platform/leetcode/user/question-progress",
                },
                parameters: [
                    { name: "user", type: "String", example: "ashokbhatt2048", description: "LeetCode username", status: "required" },
                    { name: "apiKey", type: "String", example: "your-api-key", description: "Your API Key.", status: "required" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: SERVER_BASE_URL + "/api/platform/leetcode/user/question-progress?user=&apiKey=",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point.",
            },
            {
                title: "Session Progress",
                description: ["Fetches session progress for the user."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-100" },
                    url: SERVER_BASE_URL + "/api/platform/leetcode/user/session-progress",
                },
                parameters: [
                    { name: "user", type: "String", example: "ashokbhatt2048", description: "LeetCode username", status: "required" },
                    { name: "apiKey", type: "String", example: "your-api-key", description: "Your API Key.", status: "required" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: SERVER_BASE_URL + "/api/platform/leetcode/user/session-progress?user=&apiKey=",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point.",
            },
            {
                title: "Contest Rating Distribution",
                description: ["Fetches contest rating distribution data."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-100" },
                    url: SERVER_BASE_URL + "/api/platform/leetcode/contest/rating-distribution",
                },
                parameters: [
                    { name: "apiKey", type: "String", example: "your-api-key", description: "Your API Key.", status: "required" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: SERVER_BASE_URL + "/api/platform/leetcode/contest/rating-distribution?apiKey=",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point.",
            },
            {
                title: "Question of Today",
                description: ["Fetches the question of the day from LeetCode."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-100" },
                    url: SERVER_BASE_URL + "/api/platform/leetcode/potd/today",
                },
                parameters: [
                    { name: "apiKey", type: "String", example: "your-api-key", description: "Your API Key.", status: "required" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: SERVER_BASE_URL + "/api/platform/leetcode/potd/today?apiKey=",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point.",
            },
            {
                title: "Coding Challenge Medal",
                description: ["Fetches coding challenge medal info."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-100" },
                    url: SERVER_BASE_URL + "/api/platform/leetcode/coding-challenge/medal",
                },
                parameters: [
                    { name: "apiKey", type: "String", example: "your-api-key", description: "Your API Key.", status: "required" },
                    { name: "year", type: "Integer", example: "2025", description: "Year", status: "required" },
                    { name: "month", type: "Integer", example: "12", description: "Month number (1-12)", status: "required" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: SERVER_BASE_URL + "/api/platform/leetcode/coding-challenge/medal?apiKey=",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point.",
            },
            {
                title: "Favorite Public Lists",
                description: ["Fetches a list of public favorite problem lists created by the user."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-100" },
                    url: SERVER_BASE_URL + "/api/platform/leetcode/user/favorite-list",
                },
                parameters: [
                    { name: "userSlug", type: "String", example: "ashokbhatt2048", description: "LeetCode user slug (username)", status: "required" },
                    { name: "apiKey", type: "String", example: "your-api-key", description: "Your API Key.", status: "required" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: SERVER_BASE_URL + "/api/platform/leetcode/user/favorite-list?userSlug=&apiKey=",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point.",
            },
            {
                title: "Upcoming Contests",
                description: ["Fetches a list of upcoming contests on LeetCode."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-100" },
                    url: SERVER_BASE_URL + "/api/platform/leetcode/contests/upcoming",
                },
                parameters: [
                    { name: "apiKey", type: "String", example: "your-api-key", description: "Your API Key.", status: "required" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: SERVER_BASE_URL + "/api/platform/leetcode/contests/upcoming?apiKey=",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point.",
            },
            {
                title: "Global Top Rankers",
                description: ["Fetches the global top rankers on LeetCode."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-100" },
                    url: SERVER_BASE_URL + "/api/platform/leetcode/rankings/global",
                },
                parameters: [
                    { name: "apiKey", type: "String", example: "your-api-key", description: "Your API Key.", status: "required" },
                    { name: "page", type: "Number", example: "1", description: "Page number", status: "optional" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: SERVER_BASE_URL + "/api/platform/leetcode/rankings/global?apiKey=&page=",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point.",
            },
        ],
    },
    {
        category: "Codechef",
        endpoints: [
            {
                title: "User Info",
                description: ["Fetches user profile and progress from CodeChef like problems solved, contest performance, badges, skill tests, etc."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-100" },
                    url: SERVER_BASE_URL + "/api/platform/codechef/user/profile",
                },
                parameters: [
                    { name: "user", type: "String", example: "ashokbhatt", description: "CodeChef username", status: "required" },
                    { name: "apiKey", type: "String", example: "your-api-key", description: "Your API Key.", status: "required" },
                    { name: "includeContests", type: "Boolean", example: "true", description: "Include contest data.", status: "optional" },
                    { name: "includeAchievements", type: "Boolean", example: "true", description: "Include achievements data.", status: "optional" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: SERVER_BASE_URL + "/api/platform/codechef/user/profile?user=&apiKey=&includeContests=&includeAchievements=",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point. If includeContests is set to true, it costs an additional 2 API Points. If includeAchievements is set to true, it costs an additional 1 API Point.",
            },
            {
                title: "Submission History",
                description: ["Fetches submission history for the user for the current year and the previous year."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-100" },
                    url: SERVER_BASE_URL + "/api/platform/codechef/user/submissions",
                },
                parameters: [
                    { name: "user", type: "String", example: "ashokbhatt", description: "CodeChef username", status: "required" },
                    { name: "apiKey", type: "String", example: "your-api-key", description: "Your API Key.", status: "required" },
                    { name: "year", type: "Number", example: "2024", description: "Year", status: "optional" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: SERVER_BASE_URL + "/api/platform/codechef/user/submissions?user=&apiKey=&year=",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 3 API Points.",
            },
        ],
    },
    {
        category: "Code360",
        endpoints: [
            {
                title: "User Info",
                description: ["Fetches user profile and progress from Code360 (formaly known as codestudios) like user details, avatar, streaks, badges, problems solved, contests performance, etc."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-100" },
                    url: SERVER_BASE_URL + "/api/platform/code360/user/profile",
                },
                parameters: [
                    { name: "user", type: "String", example: "AshokBhatt", description: "Code360 username", status: "required" },
                    { name: "apiKey", type: "String", example: "your-api-key", description: "Your API Key.", status: "required" },
                    { name: "includeContests", type: "Boolean", example: "true", description: "Include contest data.", status: "optional" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: SERVER_BASE_URL + "/api/platform/code360/user/profile?user=&apiKey=&includeContests=true",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point. If includeContests is set to true, it costs an additional 0.5 API Points.",
            },
            {
                title: "User Submissions",
                description: ["Fetches submission history for the user on Code360 in the given year. If year is not provided, it fetches the submission history for the current year."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-100" },
                    url: SERVER_BASE_URL + "/api/platform/code360/user/submissions",
                },
                parameters: [
                    { name: "user", type: "String", example: "AshokBhatt", description: "Code360 username", status: "required" },
                    { name: "apiKey", type: "String", example: "your-api-key", description: "Your API Key.", status: "required" },
                    { name: "year", type: "Number", example: "2024", description: "Year", status: "optional" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: SERVER_BASE_URL + "/api/platform/code360/user/submissions?user=&apiKey=&year=",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point.",
            },
        ],
    },
    {
        category: "Hackerrank",
        endpoints: [
            {
                title: "User Info",
                description: ["Fetches user profile data, badges, and certificates from Hackerrank."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-100" },
                    url: SERVER_BASE_URL + "/api/platform/hackerrank/user/profile",
                },
                parameters: [
                    { name: "user", type: "String", example: "ashokbhatt2048", description: "Hackerrank username", status: "required" },
                    { name: "apiKey", type: "String", example: "your-api-key", description: "Your API Key.", status: "required" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: SERVER_BASE_URL + "/api/platform/hackerrank/user/profile?user=&apiKey=",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point.",
            },
        ],
    },
    {
        category: "Interviewbit",
        endpoints: [
            {
                title: "User Info",
                description: ["Fetches user info like profile data, problems solved as per difficulty level, and as per category, submission analysis, etc."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-100" },
                    url: SERVER_BASE_URL + "/api/platform/interviewbit/user/profile",
                },
                parameters: [
                    { name: "user", type: "String", example: "ashok-bhatt", description: "InterviewBit username", status: "required" },
                    { name: "apiKey", type: "String", example: "your-api-key", description: "Your API Key.", status: "required" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: SERVER_BASE_URL + "/api/platform/interviewbit/user/profile?user=&apiKey=",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point.",
            },
            {
                title: "User Submissions",
                description: ["Fetches user submission data from the given year. If year is not provided, it fetches the submission history for the current year."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-100" },
                    url: SERVER_BASE_URL + "/api/platform/interviewbit/user/submissions",
                },
                parameters: [
                    { name: "user", type: "String", example: "ashok-bhatt", description: "InterviewBit username", status: "required" },
                    { name: "apiKey", type: "String", example: "your-api-key", description: "Your API Key.", status: "required" },
                    { name: "year", type: "Number", example: "2024", description: "Year", status: "optional" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: SERVER_BASE_URL + "/api/platform/interviewbit/user/submissions?user=&apiKey=&year=2024",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point.",
            },
            {
                title: "User Badges",
                description: ["Fetches badges earned by the user on InterviewBit."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-100" },
                    url: SERVER_BASE_URL + "/api/platform/interviewbit/user/badges",
                },
                parameters: [
                    { name: "user", type: "String", example: "ashok-bhatt", description: "InterviewBit username", status: "required" },
                    { name: "apiKey", type: "String", example: "your-api-key", description: "Your API Key.", status: "required" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: SERVER_BASE_URL + "/api/platform/interviewbit/user/badges?user=&apiKey=",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point.",
            },
        ],
    },
    {
        category: "Github",
        endpoints: [
            {
                title: "User Contribution Badges",
                description: ["Fetches all contribution badges shown on the user's GitHub profile page."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-100" },
                    url: SERVER_BASE_URL + "/api/platform/github/user/badges",
                },
                parameters: [
                    { name: "user", type: "String", example: "Ashok-Bhatt", description: "GitHub username", status: "required" },
                    { name: "apiKey", type: "String", example: "your-api-key", description: "Your API Key.", status: "required" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: SERVER_BASE_URL + "/api/platform/github/user/badges?user=&apiKey=",
                    response: [],
                },
                quotasInfo: "Calling this endpoint costs 1 API Point.",
            },
        ],
    }
];

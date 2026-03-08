export const API_POINTS_COST = [
    // Code360 Endpoints
    {
        baseUrl: "/platform/code360/user/profile",
        cost: {
            base: 1,
            additionalQueryCost: [
                { query: "includeContests=true", cost: 0.5 },
                { query: "includeAchievements=true", cost: 0.5 },
            ]
        },
    },
    {
        baseUrl: "/platform/code360/user/submissions",
        cost: { base: 1 }
    },

    // GFG Endpoints
    {
        baseUrl: "/platform/gfg/user/profile",
        cost: { base: 1 }
    },
    {
        baseUrl: "/platform/gfg/user/submissions",
        cost: { base: 5 }
    },
    {
        baseUrl: "/platform/gfg/user/problems",
        cost: { base: 1 }
    },
    {
        baseUrl: "/platform/gfg/institution/top-3",
        cost: { base: 1 }
    },
    {
        baseUrl: "/platform/gfg/institution/info",
        cost: { base: 1 }
    },
    {
        baseUrl: "/platform/gfg/potd/today",
        cost: { base: 1 }
    },
    {
        baseUrl: "/platform/gfg/potd/monthly",
        cost: { base: 1 }
    },

    // CodeChef Endpoints
    {
        baseUrl: "/platform/codechef/user/profile",
        cost: {
            base: 1,
            additionalQueryCost: [
                { query: "includeContests=true", cost: 0.5 },
                { query: "includeAchievements=true", cost: 0.5 },
            ],
        },
    },
    {
        baseUrl: "/platform/codechef/user/submissions",
        cost: { base: 3 }
    },

    // HackerRank Endpoints
    {
        baseUrl: "/platform/hackerrank/user/profile",
        cost: { base: 1 }
    },

    // InterviewBit Endpoints
    {
        baseUrl: "/platform/interviewbit/user/profile",
        cost: {
            base: 1,
            additionalQueryCost: [
                { query: "includeSubmissionStats=true", cost: 0.5 },
                { query: "includeBadges=true", cost: 0.5 },
            ],
        },
    },
    {
        baseUrl: "/platform/interviewbit/user/submissions",
        cost: { base: 3 }
    },
    {
        baseUrl: "/platform/interviewbit/user/badges",
        cost: { base: 1 }
    },

    // Github Endpoints
    {
        baseUrl: "/platform/github/user/badges",
        cost: { base: 1 }
    },

    // LeetCode Endpoints
    {
        baseUrl: "/platform/leetcode/user/profile",
        cost: { base: 1 }
    },
    {
        baseUrl: "/platform/leetcode/user/language-stats",
        cost: { base: 1 }
    },
    {
        baseUrl: "/platform/leetcode/user/calendar",
        cost: { base: 1 }
    },
    {
        baseUrl: "/platform/leetcode/user/recent-submissions",
        cost: { base: 1 }
    },
    {
        baseUrl: "/platform/leetcode/user/badges",
        cost: { base: 1 }
    },
    {
        baseUrl: "/platform/leetcode/user/contest-ranking",
        cost: { base: 1 }
    },
    {
        baseUrl: "/platform/leetcode/user/skill-stats",
        cost: { base: 1 }
    },
    {
        baseUrl: "/platform/leetcode/user/question-progress",
        cost: { base: 1 }
    },
    {
        baseUrl: "/platform/leetcode/user/session-progress",
        cost: { base: 1 }
    },
    {
        baseUrl: "/platform/leetcode/contest/rating-distribution",
        cost: { base: 1 }
    },
    {
        baseUrl: "/platform/leetcode/potd/today",
        cost: { base: 1 }
    },
    {
        baseUrl: "/platform/leetcode/coding-challenge/medal",
        cost: { base: 1 }
    },
    {
        baseUrl: "/platform/leetcode/contests/upcoming",
        cost: { base: 1 }
    },
    {
        baseUrl: "/platform/leetcode/rankings/global",
        cost: { base: 1 }
    },
    {
        baseUrl: "/platform/leetcode/user/favorite-list",
        cost: { base: 1 }
    },
];

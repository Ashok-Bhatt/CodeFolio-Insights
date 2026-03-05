export const LEETCODE_GRAPHQL_ENDPOINT = "https://leetcode.com/graphql";

export const LEETCODE_GRAPHQL_QUERIES = {
    userProfile: `
        query userProfileInfo($username: String!) {
            matchedUser(username: $username) {
                username
                githubUrl
                twitterUrl
                linkedinUrl
                profile {
                    ranking
                    userAvatar
                    realName
                    aboutMe
                    school
                    websites
                    countryName
                    company
                    jobTitle
                    skillTags
                    reputation
                    solutionCount
                }
            }
        }
    `,

    userLanguageStats: `
        query languageStats($username: String!) {
            matchedUser(username: $username){
                languageProblemCount {
                    languageName
                    problemsSolved
                }
            }
        }
    `,

    userContestRankings: `
        query userContestRankingInfo($username: String!) {
            userContestRanking(username: $username) {
                attendedContestsCount
                rating
                globalRanking
                totalParticipants
                topPercentage
                badge {
                    name
                    icon
                }
            }
            userContestRankingHistory(username: $username) {
                attended
                rating
                ranking
                contest {
                    title
                    startTime
                }
            }
        }
    `,

    userProfileUserQuestionProgressV2: `
        query userProfileUserQuestionProgressV2($userSlug: String!) {
            userProfileUserQuestionProgressV2(userSlug: $userSlug) {
                numAcceptedQuestions {
                    count
                    difficulty
                }
                userSessionBeatsPercentage {
                    difficulty
                    percentage
                }
                totalQuestionBeatsPercentage
            }
        }
    `,

    userSessionProgress: `
        query userSessionProgress($username: String!) {
            allQuestionsCount {
                difficulty
                count
            }
            matchedUser(username: $username) {
                submitStats {
                    acSubmissionNum {
                        difficulty
                        count
                        submissions
                    }
                }
            }
        }
    `,

    userBadges: `
        query userBadges($username: String!) {
            matchedUser(username: $username) {
                activeBadge {
                    displayName
                    icon
                }
                badges {
                    id
                    name
                    displayName
                    icon
                    creationDate
                    category
                }
            }
        }
    `,

    userProfileCalendar: `
        query userProfileCalendar($username: String!, $year: Int) {
            matchedUser(username: $username) {
                userCalendar(year: $year) {
                    activeYears
                    streak
                    totalActiveDays
                    submissionCalendar
                }
            }
        }
    `,

    recentAcSubmissions: `
        query recentAcSubmissions($username: String!, $limit: Int!) {
            recentAcSubmissionList(username: $username, limit: $limit) {
                id
                title
                titleSlug
                timestamp
            }
        }
    `,

    questionOfToday: `
        query questionOfToday {
            activeDailyCodingChallengeQuestion {
                date
                link
                question {
                    titleSlug
                    title
                    acRate
                    difficulty
                }
            }
        }
    `,

    skillStats: `
        query skillStats($username: String!) {
            matchedUser(username: $username) {
                tagProblemCounts {
                    advanced { tagName tagSlug problemsSolved }
                    intermediate { tagName tagSlug problemsSolved }
                    fundamental { tagName tagSlug problemsSolved }
                }
            }
        }
    `,

    upcomingContests: `
        query upcomingContests {
            upcomingContests {
                title
                titleSlug
                startTime
                duration
            }
        }
    `,

    globalTopRankers: `
        query globalRankingPaginated($page: Int) {
            globalRanking(page: $page) {
                totalUsers
                rankingNodes {
                    ranking
                    currentRating
                    user {
                        username
                        profile {
                            userAvatar
                            realName
                        }
                    }
                }
            }
        }
    `
};

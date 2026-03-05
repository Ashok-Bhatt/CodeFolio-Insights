import axios from "axios";
import { configBrowserPage } from "../../utils/scrapper.js";
import { getNormalizedInterviewBitHeatmap } from "../../utils/calendar.js";

const INTERVIEWBIT_HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Referer': 'https://www.interviewbit.com/',
    'Accept': 'application/json, text/plain, */*',
    'Accept-Language': 'en-US,en;q=0.9',
};

const getUserInfo = async (username) => {
    const profileRes = await axios.get(`https://www.interviewbit.com/v2/profile/username?id=${username}`, { headers: INTERVIEWBIT_HEADERS });
    const profileData = profileRes.data;

    const problemsRes = await axios.get(`https://www.interviewbit.com/v2/problem_list/problems_solved_overview_count?username=${username}`, { headers: INTERVIEWBIT_HEADERS });
    const problemsData = problemsRes.data;

    const submissionAnalysisRes = await axios.get(`https://www.interviewbit.com/v2/profile/username/submission-analysis/?id=${username}`, { headers: INTERVIEWBIT_HEADERS });
    const submissionAnalysisData = submissionAnalysisRes.data;

    delete profileData.is_friend;
    delete profileData.id;

    return { profile: profileData, problems: problemsData, submissionAnalysis: submissionAnalysisData };
};

const getUserSubmissions = async (username, year) => {
    const response = await axios.get(`https://www.interviewbit.com/v2/profile/username/daily-user-submissions/${year}/?id=${username}`, { headers: INTERVIEWBIT_HEADERS });
    const data = response.data;

    const heatmapData = {};
    for (let i = 0; i < data.length; i++) {
        heatmapData[data[i].date] = data[i].count;
    }

    return getNormalizedInterviewBitHeatmap(heatmapData, year);
};

const getUserBadges = async (username) => {
    const url = `https://www.interviewbit.com/profile/${username}/`;
    let page;

    try {
        page = await configBrowserPage(url, 'domcontentloaded', '.recharts-surface', 30000, 30000);

        const data = await page.evaluate(() => {
            const getText = (element) => element?.textContent || "NA";

            const badges = Array.from(document.querySelectorAll(".profile-badge-progress-tile")).map((badge) => ({
                title: getText(badge.querySelector(".profile-badge-progress-tile__title")),
                date: getText(badge.querySelector(".profile-badge-progress-tile__sub-title")),
                image: badge.querySelector(".profile-badge-progress-tile__badge-img")?.getAttribute("style")?.split('"')[1]?.replace('\\', ''),
            }));

            return badges;
        });

        return data;
    } finally {
        if (page) await page.close();
    }
};

export {
    getUserInfo,
    getUserSubmissions,
    getUserBadges,
};

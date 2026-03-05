import axios from "axios";
import { getNormalizedCode360Heatmap } from "../../utils/calendar.js";

const CODE360_HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Referer': 'https://www.naukri.com/code360/',
    'Accept': 'application/json, text/plain, */*',
    'Accept-Language': 'en-US,en;q=0.9',
};

const getUserInfo = async (username, includeContests = false) => {
    const userProfileResponse = await axios.get(`https://www.naukri.com/code360/api/v3/public_section/profile/user_details?uuid=${username}&request_differentiator=${new Date().getTime()}&app_context=publicsection&naukri_request=true`, { headers: CODE360_HEADERS });
    const userProfileData = userProfileResponse.data["data"];

    if (!userProfileData || !userProfileData.uuid) {
        throw new Error("Code360 user not found");
    }

    const userStreakResponse = await axios.get(`https://www.naukri.com/code360/api/v3/public_section/streaks/fetch_curr_and_long_streak?uuid=${userProfileData.uuid}&request_differentiator=${new Date().getTime()}&app_context=publicsection&naukri_request=true`, { headers: CODE360_HEADERS });
    const userStreakData = userStreakResponse.data["data"];
    userProfileData["streaks"] = userStreakData;

    if (includeContests) {
        const userContestResponse = await axios.get(`https://www.naukri.com/code360/api/v3/public_section/user_rating_data?uuid=${userProfileData.uuid}&request_differentiator=${new Date().getTime()}&app_context=publicsection&naukri_request=true`, { headers: CODE360_HEADERS });
        const userContestData = userContestResponse.data["data"];
        userProfileData["contests"] = userContestData;
    }

    delete userProfileData["uuid"];
    return userProfileData;
};

const getUserSubmissions = async (username, year) => {
    const userProfileResponse = await axios.get(`https://www.naukri.com/code360/api/v3/public_section/profile/user_details?uuid=${username}&request_differentiator=${new Date().getTime()}&app_context=publicsection&naukri_request=true`, { headers: CODE360_HEADERS });
    const userProfileData = userProfileResponse.data["data"];

    if (!userProfileData || !userProfileData.uuid) {
        throw new Error("Code360 user not found");
    }

    const userContributionsResponse = await axios.get(`https://www.naukri.com/code360/api/v3/public_section/profile/contributions?uuid=${userProfileData.uuid}&end_date=${new Date().toISOString()}&start_date=${new Date().toISOString()}&is_stats_required=true&unified=true&request_differentiator=${new Date().getTime()}&app_context=publicsection&naukri_request=true`, { headers: CODE360_HEADERS });
    const heatmapData = userContributionsResponse.data?.data?.contribution_map || {};

    return getNormalizedCode360Heatmap(heatmapData, year);
};

export {
    getUserInfo,
    getUserSubmissions,
};

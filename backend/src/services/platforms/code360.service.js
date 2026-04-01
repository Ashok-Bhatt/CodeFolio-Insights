import axios from "axios";
import { configBrowserPage } from "../../utils/scrapper.util.js";
import { getNormalizedCode360Heatmap } from "../../utils/calendar.util.js";
import { CODE360_HEADERS } from "../../constants/platform.constants.js";
import ApiError from "../../utils/api-error.util.js";

const getUserInfo = async (username, includeAchievements) => {
    const url = `https://www.naukri.com/code360/profile/${username}`;
    let page;

    try {
        page = await configBrowserPage(url, 'networkidle2', '.profile-details-container', 30000, 30000);

        const data = await page.evaluate(async (username, includeAchievements) => {
            const getText = (element) => element?.textContent || "NA";
            const profileContainer = document.querySelector(".profile-details-container");
            if (!profileContainer) return null;

            const nameElement = document.querySelector(".user-name");
            const profileImageElement = document.querySelector(".user-image img");
            const collegeElement = document.querySelector(".user-college");
            const ratingElement = document.querySelector(".rating-value");

            const code360Data = {
                username: username,
                name: getText(nameElement),
                profileImage: profileImageElement?.getAttribute("src") || "NA",
                college: getText(collegeElement),
                rating: ratingElement ? parseInt(getText(ratingElement)) : 0,
            };

            if (includeAchievements) {
                const badgeElements = Array.from(document.querySelectorAll(".badge-item"));
                code360Data.badges = badgeElements.map(badge => ({
                    title: getText(badge.querySelector(".badge-title")),
                    image: badge.querySelector("img")?.getAttribute("src") || "NA",
                }));
            }

            return code360Data;
        }, username, includeAchievements);

        return data;
    } catch (error) {
        if (error.name === 'TimeoutError' || error.message.includes('selector')) {
            return null;
        }
        throw new ApiError(500, "Failed to connect to Code360 service.");
    } finally {
        if (page) await page.close();
    }
};

const getUserSubmissions = async (username, year) => {
    const userProfileResponse = await axios.get(`https://www.naukri.com/code360/api/v3/public_section/profile/user_details?uuid=${username}&request_differentiator=${new Date().getTime()}&app_context=publicsection&naukri_request=true`, { headers: CODE360_HEADERS });
    const userProfileData = userProfileResponse.data["data"];

    if (!userProfileData || !userProfileData.uuid) {
        throw new ApiError(404, "Code360 user not found");
    }

    const userContributionsResponse = await axios.get(`https://www.naukri.com/code360/api/v3/public_section/profile/contributions?uuid=${userProfileData.uuid}&end_date=${new Date().toISOString()}&start_date=${new Date().toISOString()}&is_stats_required=true&unified=true&request_differentiator=${new Date().getTime()}&app_context=publicsection&naukri_request=true`, { headers: CODE360_HEADERS });
    const heatmapData = userContributionsResponse.data?.data?.contribution_map || {};

    return getNormalizedCode360Heatmap(heatmapData, year);
};

export {
    getUserInfo,
    getUserSubmissions,
};

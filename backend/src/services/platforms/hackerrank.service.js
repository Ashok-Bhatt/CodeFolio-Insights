import axios from "axios";
import { HACKERRANK_HEADERS } from "../../constants/index.js"

const getUserInfo = async (username) => {
    const profileRes = await axios.get(`https://www.hackerrank.com/rest/contests/master/hackers/${username}/profile`, { headers: HACKERRANK_HEADERS });
    const profileData = profileRes.data["model"];

    const schoolRes = await axios.get(`https://www.hackerrank.com/community/v1/hackers/${username}/hacker_schools`, { headers: HACKERRANK_HEADERS });
    const schoolData = schoolRes.data["data"];

    const linksRes = await axios.get(`https://www.hackerrank.com/rest/hackers/${username}/links`, { headers: HACKERRANK_HEADERS });
    const linksData = linksRes.data;

    const badgesRes = await axios.get(`https://www.hackerrank.com/rest/hackers/${username}/badges`, { headers: HACKERRANK_HEADERS });
    const badgesData = badgesRes.data["models"];

    const certificatesRes = await axios.get(`https://www.hackerrank.com/community/v1/test_results/hacker_certificate?username=${username}`, { headers: HACKERRANK_HEADERS });
    const certificatesData = certificatesRes.data["data"];

    return {
        profile: {
            username: profileData["username"],
            country: profileData["country"],
            languages: profileData["languages"],
            created_at: profileData["created_at"],
            avatar: profileData["avatar"],
            website: profileData["website"],
            short_bio: profileData["short_bio"],
            name: profileData["name"],
            followers_count: profileData["followers_count"],
        },
        school: schoolData,
        links: linksData,
        badges: badgesData,
        certificates: certificatesData,
    };
};

export {
    getUserInfo,
};

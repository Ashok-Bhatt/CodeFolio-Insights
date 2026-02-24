import { axiosInstance, asyncWrapper } from "../api/export.js";
import { useMutation, useQuery } from "@tanstack/react-query"

const useSaveScore = () => {
    return useMutation({
        mutationFn: asyncWrapper(async (scoreData) => {
            const response = await axiosInstance.post("/score", scoreData);
            return response.data;
        }),
    });
}

const usePlatformScoreStats = (score, platform) => {
    return useQuery({
        queryKey: ["platformScoreStats", score, platform],
        queryFn: asyncWrapper(async () => {
            const response = await axiosInstance.get(`/score/platform-score-stats?score=${score}&platform=${platform}`);
            return response.data;
        }),
        enabled: !!score && !!platform,
    });
}

const useScoreHistory = (platform, username, last = 10) => {
    return useQuery({
        queryKey: ["scoreHistory", platform, username, last],
        queryFn: asyncWrapper(async () => {
            const response = await axiosInstance.get(`/score/score-history?platform=${platform}&username=${username}&last=${last}`);
            return response.data;
        }),
        enabled: !!platform,
    });
}

export {
    useSaveScore,
    usePlatformScoreStats,
    useScoreHistory,
};

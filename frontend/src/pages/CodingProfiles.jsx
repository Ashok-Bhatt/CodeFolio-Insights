import { useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { BadgeCollection, TopicAnalysis, Contest, ContestAchievements } from '../components/export.js';
import { StatCard, ProblemsCard } from '../components/card/export.js';
import { SubmissionHeatmap } from '../components/charts/export.js';
import { getTotalProblems, getBadges, getTopicAnalysis, getContestData, getDsaProblemsData, getContestAchievements, getFundamentalProblemsData, getCompetitiveProgrammingProblemsData } from '../utils/dataHelpers.js';
import { getCombinedHeatmap } from '../utils/export.js';
import { getStreaksAndActiveDays } from "../utils/calendar.js"

const CodingProfiles = () => {
    const { data } = useOutletContext();

    const combinedHeatmapData = useMemo(() => getCombinedHeatmap(
        data?.leetcode?.submission,
        data?.gfg?.submission,
        data?.codechef?.submission,
        data?.interviewbit?.submission,
        data?.code360?.submission
    ), [data]);

    const totalProblems = useMemo(() => getTotalProblems(data), [data]);
    const badges = useMemo(() => Object.values(getBadges(data)).flat(), [data]);
    const topicAnalysis = useMemo(() => getTopicAnalysis(data), [data]);
    const contestData = useMemo(() => getContestData(data), [data]);
    const dsaProblemsData = useMemo(() => getDsaProblemsData(data), [data]);
    const fundamentalProblemsData = useMemo(() => getFundamentalProblemsData(data), [data]);
    const competitiveProgrammingProblemsData = useMemo(() => getCompetitiveProgrammingProblemsData(data), [data]);
    const contestAchievements = useMemo(() => getContestAchievements(data), [data]);
    const { activeDays } = useMemo(() => getStreaksAndActiveDays(combinedHeatmapData), [combinedHeatmapData]);
    const contestCount = useMemo(() => Object.entries(contestData).reduce((total, [key, value]) => total + value.length, 0), [contestData]);

    console.log(badges);

    return (
        <div className="space-y-8 animate-float-in">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <div className="xl:col-span-1 space-y-8">
                    <div className="grid grid-cols-2 gap-4">
                        <StatCard
                            title="Total Problems"
                            value={totalProblems}
                            color="blue"
                            index={0}
                        />
                        <StatCard
                            title="Active Days"
                            value={activeDays}
                            color="green"
                            index={1}
                        />
                    </div>

                    <BadgeCollection
                        title="Badges"
                        badges={badges}
                    />

                    <TopicAnalysis
                        title="DSA Topic Analysis"
                        data={topicAnalysis}
                    />

                    {contestCount > 0 && <Contest
                        data={contestData}
                    />}
                </div>

                <div className="xl:col-span-1 space-y-8">
                    <ProblemsCard
                        title="Fundamentals"
                        problemsData={fundamentalProblemsData}
                    />

                    <ProblemsCard
                        title="DSA"
                        problemsData={dsaProblemsData}
                    />

                    <ProblemsCard
                        title="Competitive Programming"
                        problemsData={competitiveProgrammingProblemsData}
                    />

                    {contestCount > 0 && <ContestAchievements
                        achievements={contestAchievements}
                    />}
                </div>

                <SubmissionHeatmap
                    calendar={combinedHeatmapData}
                    className="col-span-1 lg:col-span-2"
                />
            </div>
        </div>
    );
};

export default CodingProfiles;

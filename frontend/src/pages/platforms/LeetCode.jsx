import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { DashboardSkeleton } from '../../components/skeletons/export.js';
import { getTotalActiveDays } from '../../utils/dataHelpers.js';
import { StatCard, ProblemsCard } from '../../components/card/export.js';
import { BadgeCollection, TopicAnalysis, ContestAchievements } from '../../components/export.js';
import { SubmissionHeatmap, ContestGraph } from '../../components/charts/export.js';
import { getContestData, getContestAchievements } from '../../utils/dataHelpers.js';

const LeetCode = () => {
    const { data } = useOutletContext();

    if (!data) {
        return <DashboardSkeleton />;
    }

    const platformData = data.leetcode;
    
    const platformProblemsData = [
        { 
            name: 'Easy', 
            value: (platformData?.problems?.acSubmissionNum[1]?.count || 0), 
            color: '#10B981' },
        { 
            name: 'Medium', 
            value: (platformData?.problems?.acSubmissionNum[2]?.count || 0), 
            color: '#FBBF24' },
        { 
            name: 'Hard', 
            value: (platformData?.problems?.acSubmissionNum[3]?.count || 0), 
            color: '#FF4524' 
        }
    ];

    const topicStats = (Object.values(platformData?.topicStats))?.flat()?.reduce((acc, { tagSlug, problemsSolved }) => {
        acc[tagSlug] = problemsSolved;
        return acc;
    }, {});

    return (
        <div className="space-y-8 animate-float-in">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

                <StatCard
                    title="Total Problems"
                    value={platformData?.problems?.acSubmissionNum?.[0]?.count || 0}
                    color="blue"
                    index={0}
                />

                <StatCard
                    title="Active Days"
                    value={getTotalActiveDays(platformData?.submission)}
                    color="green"
                    index={1}
                />

                <BadgeCollection
                    title="Badges"
                    defaultBadgesCount={2}
                    badges={platformData?.badges?.badges.map((badge) => {
                        if (badge.category === "COMPETITION" && !badge.icon.includes("https://leetcode.com")) badge.icon = "https://leetcode.com" + badge.icon;
                        return badge;
                    })}
                />

                <ProblemsCard
                    title="DSA Problems"
                    problemsData={platformProblemsData}
                />

                {platformData?.contest?.userContestRanking?.attendedContestsCount > 0 && (
                    <>
                        <ContestGraph
                            contestData={(getContestData(data)?.LeetCode) || []}
                            className="col-span-1"
                        />

                        <ContestAchievements
                            achievements={getContestAchievements(data).filter((achievement) => achievement.platform === "LeetCode")}
                            className="col-span-1"
                        />
                    </>
                )}

                <TopicAnalysis
                    title="DSA Topic Analysis"
                    data={topicStats}
                    className="col-span-1 lg:col-span-2"
                />

                <SubmissionHeatmap
                    calendar={platformData?.submission}
                    className="col-span-1 lg:col-span-2"
                />
            </div>
        </div>
    );
};

export default LeetCode;

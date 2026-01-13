import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { getTotalActiveDays } from '../../utils/dataHelpers.js';
import { StatCard, ProblemsCard } from '../../components/card/export.js';
import { BadgeCollection, TopicAnalysis } from '../../components/export.js';
import { SubmissionHeatmap } from '../../components/charts/export.js';

const Interviewbit = () => {
    const { data } = useOutletContext();

    const platformData = data.interviewbit;

    const platformProblemsData = [
        {
            name: 'Easy',
            value: (platformData?.profile?.problems?.difficulty_problems_solved?.find(d => d.difficulty_level === 'easy')?.solved_problems_count || 0),
            color: '#10B981'
        },
        {
            name: 'Medium',
            value: (platformData?.profile?.problems?.difficulty_problems_solved?.find(d => d.difficulty_level === 'medium')?.solved_problems_count || 0),
            color: '#FBBF24'
        },
        {
            name: 'Hard',
            value: (platformData?.profile?.problems?.difficulty_problems_solved?.find(d => d.difficulty_level === 'hard')?.solved_problems_count || 0),
            color: '#FF4524'
        }
    ];

    const topicStats = platformData?.profile?.problems?.topic_problems_solved?.reduce((acc, topic) => {
        acc[topic.title] = topic.solved_problems_count;
        return acc;
    }, {}) || {};

    const badges = platformData?.profile?.badges?.map((badge) => ({
        icon: badge.image,
        name: badge.title,
        subTitle: null,
        subTitleIcon: null
    })) || [];

    return (
        <div className="space-y-8 animate-float-in">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

                <StatCard
                    title="Total Problems"
                    value={platformData?.profile?.problems?.total_problems_solved || 0}
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
                    badges={badges}
                />

                <ProblemsCard
                    title="DSA Problems"
                    problemsData={platformProblemsData}
                />

                <TopicAnalysis
                    title="Topic Analysis"
                    data={topicStats}
                    className="xl:col-span-2"
                />

                <div className="xl:col-span-2">
                    <SubmissionHeatmap
                        calendar={platformData?.submission}
                        className="w-full"
                    />
                </div>
            </div>
        </div>
    );
};

export default Interviewbit;

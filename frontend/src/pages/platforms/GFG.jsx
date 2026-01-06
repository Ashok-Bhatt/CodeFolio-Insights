import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { DashboardSkeleton } from '../../components/skeletons/export.js';
import { getTotalActiveDays } from '../../utils/dataHelpers.js';
import { StatCard, ProblemsCard } from '../../components/card/export.js';
import { SubmissionHeatmap } from '../../components/charts/export.js';

const GFG = () => {
    const { data } = useOutletContext();

    if (!data) {
        return <DashboardSkeleton />;
    }

    const platformData = data.gfg;

    const platformDsaProblemsData = [
        {
            name: 'Easy',
            value: (platformData?.profile?.problemsSolved?.Easy || 0),
            color: '#10B981'
        },
        {
            name: 'Medium',
            value: (platformData?.profile?.problemsSolved?.Medium || 0),
            color: '#FBBF24'
        },
        {
            name: 'Hard',
            value: (platformData?.profile?.problemsSolved?.Hard || 0),
            color: '#FF4524'
        }
    ];

    const platformFundamentalsProblemsData = [
        {
            name: 'School',
            value: (platformData?.profile?.problemsSolved?.School || 0),
            color: '#10B981'
        },
        {
            name: 'Basic',
            value: (platformData?.profile?.problemsSolved?.Basic || 0),
            color: '#FBBF24'
        },
    ];

    return (
        <div className="space-y-8 animate-float-in">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

                <StatCard
                    title="Total Problems"
                    value={platformData?.profile?.totalProblemsSolved || 0}
                    color="blue"
                    index={0}
                />

                <StatCard
                    title="Active Days"
                    value={getTotalActiveDays(platformData?.submission)}
                    color="green"
                    index={1}
                />

                <ProblemsCard
                    title="Fundamentals Problems"
                    problemsData={platformFundamentalsProblemsData}
                />

                <ProblemsCard
                    title="DSA Problems"
                    problemsData={platformDsaProblemsData}
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

export default GFG;

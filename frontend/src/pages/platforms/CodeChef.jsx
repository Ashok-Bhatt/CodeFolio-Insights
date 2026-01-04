import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { DashboardSkeleton } from '../../components/skeletons/export.js';
import { getTotalActiveDays } from '../../utils/dataHelpers.js';
import { StatCard } from '../../components/card/export.js';
import { BadgeCollection } from '../../components/export.js';
import { SubmissionHeatmap } from '../../components/charts/export.js';

const CodeChef = () => {
    const { data } = useOutletContext();

    if (!data) {
        return <DashboardSkeleton />;
    }

    const platformData = data.codechef;

    const badges = platformData?.profile?.badges?.map((badge) => ({
        icon: badge.badgeImage,
        name: badge.badgeTitle,
        subTitle: null,
        subTitleIcon: null
    })) || [];

    return (
        <div className="space-y-8 animate-float-in">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

                <StatCard
                    title="Total Problems"
                    value={platformData?.profile?.problemsSolved || 0}
                    color="blue"
                    index={0}
                />

                <StatCard
                    title="Active Days"
                    value={getTotalActiveDays(platformData?.submission)}
                    color="green"
                    index={1}
                />

                <div className="xl:col-span-2">
                    <BadgeCollection
                        title="Badges"
                        defaultBadgesCount={4}
                        badges={badges}
                    />
                </div>

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

export default CodeChef;

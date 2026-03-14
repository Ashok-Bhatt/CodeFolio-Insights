import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { useMemo } from 'react';
import { getStreaksAndActiveDays } from '../../utils/calendar.js';
import { StatCard } from '../../components/card/export.js';
import { BadgeCollection } from '../../components/export.js';
import { SubmissionHeatmap } from '../../components/charts/export.js';

const CodeChef = () => {
    const { data } = useOutletContext();

    const platformData = data.codechef;

    const badges = useMemo(() => platformData?.profile?.badges?.map((badge) => ({
        icon: badge.badgeImage,
        name: badge.badgeTitle,
        subTitle: null,
        subTitleIcon: null
    })) || [], [platformData]);

    const { activeDays } = useMemo(() => getStreaksAndActiveDays(platformData?.submission || {}), [platformData]);
    const problemsData = platformData?.profile?.problemsSolved || 0;

    return (
        <div className="space-y-8 animate-float-in">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

                <StatCard
                    title="Total Problems"
                    value={problemsData}
                    color="blue"
                    index={0}
                />

                <StatCard
                    title="Active Days"
                    value={activeDays}
                    color="green"
                    index={1}
                />

                <div className="xl:col-span-2">
                    <BadgeCollection
                        title="Badges"
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

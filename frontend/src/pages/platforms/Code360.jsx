import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { DashboardSkeleton } from '../../components/skeletons/export.js';
import { getTotalActiveDays } from '../../utils/dataHelpers.js';
import { StatCard, ProblemsCard } from '../../components/card/export.js';
import { BadgeCollection, ContestAchievements } from '../../components/export.js';
import { SubmissionHeatmap, ContestGraph } from '../../components/charts/export.js';
import { getContestData, getContestAchievements } from '../../utils/dataHelpers.js';

const Code360 = () => {
    const { data } = useOutletContext();

    if (!data) {
        return <DashboardSkeleton />;
    }

    const platformData = data.code360;

    const platformProblemsData = [
        {
            name: 'Easy',
            value: (platformData?.profile?.dsa_domain_data?.problem_count_data?.difficulty_data?.[0]?.count || 0),
            color: '#10B981'
        },
        {
            name: 'Medium',
            value: (platformData?.profile?.dsa_domain_data?.problem_count_data?.difficulty_data?.[1]?.count || 0),
            color: '#FBBF24'
        },
        {
            name: 'Hard',
            value: (platformData?.profile?.dsa_domain_data?.problem_count_data?.difficulty_data?.[2]?.count || 0),
            color: '#FF4524'
        }
    ];

    const badges = [
        ...(platformData?.profile?.dsa_domain_data?.badges_hash?.achiever?.gp?.map((badge) => ({ icon: "/Images/Code360 Badges/Guided Path/achiever.svg", name: badge, subTitle: "Achiever", subTitleIcon: null })) || []),
        ...(platformData?.profile?.dsa_domain_data?.badges_hash?.achiever?.ptm?.map((badge) => ({ icon: "/Images/Code360 Badges/Practice/achiever.svg", name: badge, subTitle: "Achiever", subTitleIcon: null })) || []),
        ...(platformData?.profile?.dsa_domain_data?.badges_hash?.achiever?.sgp?.map((badge) => ({ icon: "/Images/Code360 Badges/Special Guided Path/achiever.svg", name: badge, subTitle: "Achiever", subTitleIcon: null })) || []),
        ...(platformData?.profile?.dsa_domain_data?.badges_hash?.specialist?.gp?.map((badge) => ({ icon: "/Images/Code360 Badges/Guided Path/specialist.svg", name: badge, subTitle: "Specialist", subTitleIcon: null })) || []),
        ...(platformData?.profile?.dsa_domain_data?.badges_hash?.specialist?.ptm?.map((badge) => ({ icon: "/Images/Code360 Badges/Practice/specialist.svg", name: badge, subTitle: "Specialist", subTitleIcon: null })) || []),
        ...(platformData?.profile?.dsa_domain_data?.badges_hash?.specialist?.sgp?.map((badge) => ({ icon: "/Images/Code360 Badges/Special Guided Path/specialist.svg", name: badge, subTitle: "Specialist", subTitleIcon: null })) || []),
        ...(platformData?.profile?.dsa_domain_data?.badges_hash?.master?.gp?.map((badge) => ({ icon: "/Images/Code360 Badges/Guided Path/master.svg", name: badge, subTitle: "Master", subTitleIcon: null })) || []),
        ...(platformData?.profile?.dsa_domain_data?.badges_hash?.master?.ptm?.map((badge) => ({ icon: "/Images/Code360 Badges/Practice/master.svg", name: badge, subTitle: "Master", subTitleIcon: null })) || []),
        ...(platformData?.profile?.dsa_domain_data?.badges_hash?.master?.sgp?.map((badge) => ({ icon: "/Images/Code360 Badges/Special Guided Path/master.svg", name: badge, subTitle: "Master", subTitleIcon: null })) || []),
    ];

    return (
        <div className="space-y-8 animate-float-in">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

                <StatCard
                    title="Total Problems"
                    value={platformData?.profile?.dsa_domain_data?.problem_count_data?.total_count || 0}
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

                {platformData?.profile?.contests?.user_rating_data?.length > 0 && (
                    <>
                        <ContestGraph
                            contestData={(getContestData(data)?.Code360) || []}
                            className="col-span-1"
                        />

                        <ContestAchievements
                            achievements={getContestAchievements(data).filter((achievement) => achievement.platform === "Code360")}
                            className="col-span-1"
                        />
                    </>
                )}

                <SubmissionHeatmap
                    calendar={platformData?.submission}
                    className="col-span-1 lg:col-span-2"
                />
            </div>
        </div>
    );
};

export default Code360;

import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { DashboardSkeleton } from '../../components/skeletons/export.js';
import { BadgeCollection, CertificatesCollection } from '../../components/export.js';
import { StatCard, ProblemsCard } from '../../components/card/export.js'; 
import { LANGUAGE_COLORS } from '../../constants/index.js';

const HackerRank = () => {
    const { data } = useOutletContext();

    if (!data) {
        return <DashboardSkeleton />;
    }

    const platformData = data.hackerrank;
    const certificates = platformData?.profile?.certificates?.filter((cert) => cert.attributes.status === 'test_passed') || [];

    const totalProblems = platformData?.profile?.badges?.reduce((total, badge) => total + (badge.solved || 0), 0) || 0;

    const badges = platformData?.profile?.badges?.map((badge) => ({
        icon: badge.icon_url,
        name: badge.badge_name,
        subTitle: `Level ${badge.level || 1}`,
        subTitleIcon: null
    })) || [];

    const platformProblemsData = platformData?.profile?.badges?.sort((a, b) => b.solved - a.solved)?.map((badge, index) => ({
        name: badge.badge_name,
        value: badge.solved || 0,
        color: LANGUAGE_COLORS[index % LANGUAGE_COLORS.length]
    })) || [];

    return (
        <div className="space-y-8 animate-float-in">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

                <StatCard
                    title="Total Problems"
                    value={totalProblems}
                    color="blue"
                    index={0}
                />

                <StatCard
                    title="Certificates"
                    value={certificates.length}
                    color="purple"
                    index={1}
                />

                <ProblemsCard
                    title="Solved Progress"
                    problemsData={platformProblemsData}
                />

                <CertificatesCollection
                    title="Earned Certificates"
                    certificates={certificates}
                    defaultCertificatesCount={2}
                />

                <BadgeCollection
                    title="Skill Badges"
                    defaultBadgesCount={6}
                    badges={badges}
                    className="xl:col-span-2"
                />
            </div>
        </div>
    );
};

export default HackerRank;

import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { LanguageStats, GithubStats, BadgeCollection } from '../../components/export.js';
import { SubmissionHeatmap } from '../../components/charts/export.js';
import { FolderGit, GitCommitHorizontal, GitPullRequest, Ban } from "lucide-react";

const Github = () => {
    const { data } = useOutletContext();

    const githubData = data?.github;

    return (
        <div className="space-y-8 animate-float-in">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <LanguageStats languageStats={githubData?.languageStats} />

                <GithubStats statsArray={[
                    { icon: <FolderGit className="text-yellow-500" />, name: "Repos", value: githubData?.profile?.public_repos },
                    { icon: <GitCommitHorizontal className="text-orange-500" />, name: "Commits", value: githubData?.contributions?.commitsCount || 0 },
                    { icon: <GitPullRequest className="text-green-500" />, name: "PRs", value: githubData?.contributions?.pullRequestsCount || 0 },
                    { icon: <Ban className="text-red-500" />, name: "issues", value: githubData?.contributions?.issuesCount || 0 },
                ]} />

                <BadgeCollection
                    title="Badges"
                    badges={githubData?.badges?.map((badge) => ({ icon: badge.icon, name: badge.name })) || []}
                    className="xl:col-span-2"
                />

                <SubmissionHeatmap
                    calendar={githubData?.calendar}
                    className="xl:col-span-2"
                />
            </div>
        </div>
    );
};

export default Github;

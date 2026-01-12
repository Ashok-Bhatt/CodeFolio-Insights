import { useAuthStore } from '../store/export.js';
import { Link as LinkIcon } from 'lucide-react';
import { transformBackendToFrontend } from '../utils/linkHelpers.js';
import { LinkCard } from '../components/card/export.js';
import { useProfileLinks, useUpdateProfileLink } from '../hooks/useProfiles.js';
import { PLATFORMS_CONFIG } from '../constants/index.js';

import toast from 'react-hot-toast';

const LinkPage = () => {
    const userId = useAuthStore((state) => state?.user?._id);

    const { data: profile, refetch: fetchLinks } = useProfileLinks(userId);
    const { mutateAsync: updateProfileMutation, isPending, variables } = useUpdateProfileLink();

    const iconMap = {
        leetcode: "/Images/Icons/leetcode.png",
        github: "/Images/Icons/github.png",
        gfg: "/Images/Icons/gfg.png",
        hackerrank: "/Images/Icons/hackerrank.png",
        codechef: "/Images/Icons/codechef.png",
        code360: "/Images/Icons/code360.png",
        interviewbit: "/Images/Icons/interviewbit.png",
    };

    const platforms = PLATFORMS_CONFIG.map(p => ({ ...p, icon: iconMap[p.value] }));

    const currentLinks = profile ? transformBackendToFrontend(profile, platforms) : [];

    const handleUpdate = async (platformValue, newUsername) => {
        if (!newUsername.trim()) {
            return; // Backend validator requires min length 1
        }

        try {
            await updateProfileMutation({
                platformName: platformValue,
                platformUsername: newUsername
            });
            toast.success(`${platformValue.charAt(0).toUpperCase() + platformValue.slice(1)} link updated successfully!`);
            fetchLinks();
        } catch (error) {
            toast.error("Couldn't update the link");
            console.error("Failed to update link", error);
        }
    };

    return (
        <div className="animate-float-in">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-blue-100/50 p-8">
                <h2 className="text-2xl font-black text-gray-800 flex items-center gap-3 mb-6">
                    <LinkIcon className="w-6 h-6 text-blue-600" />
                    Manage Links
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mx-auto">
                    {platforms.map((platform, index) => {
                        const existingLink = currentLinks.find(l => l.platform === platform.value);

                        return (
                            <LinkCard
                                key={platform.value}
                                platform={platform}
                                link={existingLink}
                                index={index}
                                onSave={handleUpdate}
                                isUpdating={isPending && variables?.platformName === platform.value}
                                isAnyUpdating={isPending}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default LinkPage;

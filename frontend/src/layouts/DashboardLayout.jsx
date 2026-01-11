import { useEffect } from 'react';
import { useParams, Outlet } from 'react-router-dom';
import DashboardSidebar from '../components/sidebars/DashboardSidebar.jsx';
import { useProfileCache, useProfileRefresh } from '../hooks/useProfiles.js';
import { useUser } from '../hooks/export.js';
import Loader from '../components/loaders/Loader.jsx';

const DashboardLayout = () => {
    const { userId } = useParams();
    const { data: cacheData, isLoading: isLoadingCache } = useProfileCache(userId);
    const { data: refreshData, isLoading: isRefreshing, refetch: triggerRefresh } = useProfileRefresh(userId);
    const { data: userData, error: userError } = useUser(userId);

    console.log(userError);

    const data = refreshData || cacheData;

    // Stale Check Logic
    useEffect(() => {
        if (!userId) return;

        if (!isLoadingCache) {
            if (!cacheData) {
                triggerRefresh();
            } else {
                const lastUpdated = cacheData.lastUpdated;
                const dataRefreshRateInMs = 15 * 60 * 1000;
                const now = Date.now();

                if (!lastUpdated || (now - new Date(lastUpdated).getTime() > dataRefreshRateInMs)) {
                    triggerRefresh();
                }
            }
        }
    }, [userId, cacheData, isLoadingCache]);

    return (
        <div className="flex flex-1 overflow-hidden h-screen bg-white">
            <DashboardSidebar userData={userData} />
            <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-slate-50/50">

                {isRefreshing && <Loader text="Refreshing stats..." showLoading={true} />}

                <Outlet
                    context={{ data, userData, isLoading: isLoadingCache }}
                />
            </main>
        </div>
    );
};

export default DashboardLayout;

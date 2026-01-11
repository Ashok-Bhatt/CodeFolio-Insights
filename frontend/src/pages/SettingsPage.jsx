import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/export.js';
import { SettingsSidebar } from '../components/sidebars/export.js';

const SettingsPage = () => {
    const authUser = useAuthStore((state) => state.user);
    const [user, setUser] = useState(authUser);

    // Sync local state when authUser changes
    useEffect(() => {
        if (authUser) setUser(authUser);
    }, [authUser]);

    const animationStyles = `
        @keyframes floatIn { 0% { opacity: 0; transform: translateY(20px) scale(0.95); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
        .animate-float-in { animation: floatIn 0.6s ease-out forwards; }
    `;

    return (
        <div className="h-full w-full bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30 font-sans overflow-hidden flex">
            <style>{animationStyles}</style>

            <SettingsSidebar />

            <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
                <div className="max-w-4xl mx-auto animate-float-in">
                    <Outlet context={{ user, setUser }} />
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;

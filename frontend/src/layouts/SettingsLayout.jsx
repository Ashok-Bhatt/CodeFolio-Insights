import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/export.js';
import { TabNavigation } from '../components/export.js';
import { Sidebar } from '../components/sidebars/export.js';
import { Palette, UserRoundPen, Link, CircleUserRound } from 'lucide-react';
import { usePreferenceStore } from '../store/export.js';

const SettingsLayout = () => {
    const authUser = useAuthStore((state) => state.user);
    const [user, setUser] = useState(authUser);
    const pageView = usePreferenceStore((state) => state.pageView);

    const navItems = [
        { name: 'Profile Info', path: '/settings/profile', Icon: UserRoundPen },
        { name: 'Appearance', path: '/settings/appearance', Icon: Palette },
        { name: 'Manage Links', path: '/settings/links', Icon: Link },
        { name: 'Account', path: '/settings/account', Icon: CircleUserRound },
    ];

    // Sync local state when authUser changes
    useEffect(() => {
        if (authUser) setUser(authUser);
    }, [authUser]);

    const animationStyles = `
        @keyframes floatIn { 0% { opacity: 0; transform: translateY(20px) scale(0.95); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
        .animate-float-in { animation: floatIn 0.6s ease-out forwards; }
    `;

    return (
        <div className={`flex ${pageView["Settings"]=="tab" ? "flex-col" : "flex-row"} h-full w-full bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30 font-sans overflow-hidden`}>
            <style>{animationStyles}</style>

            {pageView["Settings"]=="tab" ? <TabNavigation tabs={navItems} /> : <Sidebar title='Settings' items={navItems} />}

            <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
                <div className="w-full animate-float-in">
                    <Outlet context={{ user, setUser }} />
                </div>
            </div>
        </div>
    );
};

export default SettingsLayout;

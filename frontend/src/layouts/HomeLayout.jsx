import { Outlet } from 'react-router-dom';
import { ProtectedLayout } from '../layouts/export.js';
import { MainSidebar } from '../components/sidebars/export.js';

const HomeLayout = () => {
    return (
        <ProtectedLayout requiresAuthentication={true}>
            <div className="flex h-screen bg-gradient-to-br from-green-50/30 via-white to-blue-50/30 font-sans">
                <MainSidebar />
                <div className="flex-1 relative overflow-y-auto overflow-x-hidden">
                    <Outlet />
                </div>
            </div>
        </ProtectedLayout>
    );
};

export default HomeLayout;

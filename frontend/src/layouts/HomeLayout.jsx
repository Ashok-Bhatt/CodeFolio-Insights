import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar, ProtectedRoute } from '../components/export.js';

const HomeLayout = () => {
    return (
        <ProtectedRoute requiresAuthentication={true}>
            <div className="flex h-screen bg-gradient-to-br from-green-50/30 via-white to-blue-50/30 font-sans">
                <Sidebar />
                <div className="flex-1 relative overflow-y-auto overflow-x-hidden">
                    <Outlet />
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default HomeLayout;

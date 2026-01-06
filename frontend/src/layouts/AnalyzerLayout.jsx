import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { Code, Github, FileUser } from 'lucide-react';

const AnalyzerLayout = () => {
    const location = useLocation();

    const navItems = [
        { name: 'LeetCode', path: '/analyzer/leetcode', Icon: Code },
        { name: 'GitHub', path: '/analyzer/github', Icon: Github },
        { name: 'Resume', path: '/analyzer/resume', Icon: FileUser },
    ];

    return (
        <div className="flex-1 flex flex-col min-w-0 bg-white overflow-hidden h-screen">
            {/* Horizontal Tabs Navigation */}
            <div className="flex-shrink-0 bg-white border-b border-gray-100 px-8 py-2">
                <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
                    {navItems.map((item) => {
                        const Icon = item.Icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) => `
                                    flex items-center gap-2 px-6 py-3 rounded-2xl transition-all duration-300 relative group
                                    ${isActive
                                        ? 'bg-blue-50 text-blue-600 font-bold'
                                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}
                                `}
                            >
                                <Icon size={18} className={isActive ? 'animate-pulse' : 'group-hover:scale-110 transition-transform'} />
                                <span className="text-sm tracking-tight">{item.name}</span>
                                {isActive && (
                                    <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-blue-600 rounded-full" />
                                )}
                            </NavLink>
                        );
                    })}
                </div>
            </div>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-slate-50/50">
                <div className="max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AnalyzerLayout;

import { Outlet } from 'react-router-dom';
import { Code, Github, FileUser } from 'lucide-react';
import { TabNavigation } from '../components/export.js';

const AnalyzerLayout = () => {
    const navItems = [
        { name: 'LeetCode', path: '/analyzer/leetcode', Icon: Code },
        { name: 'GitHub', path: '/analyzer/github', Icon: Github },
        { name: 'Resume', path: '/analyzer/resume', Icon: FileUser },
    ];

    return (
        <div className="flex-1 flex flex-col min-w-0 bg-white overflow-hidden h-screen">
            {/* Horizontal Tabs Navigation */}
            <TabNavigation tabs={navItems} />

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

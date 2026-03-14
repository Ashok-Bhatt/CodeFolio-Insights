import { Outlet } from 'react-router-dom';
import { BookOpen, FolderDot, HelpCircle } from 'lucide-react';
import { TabNavigation } from '../components/export.js';

const PublicApisLayout = () => {
    const navTabs = [
        { name: 'Documentation', path: '/public-apis/documentation', Icon: BookOpen },
        { name: 'Projects', path: '/public-apis/projects', Icon: FolderDot },
        { name: 'FAQ', path: '/public-apis/faq', Icon: HelpCircle },
    ];

    return (
        <div className="flex flex-col h-full bg-slate-50/50">
            {/* Header/Nav for Public APIs */}
            <TabNavigation tabs={navTabs} />

            {/* Content Area */}
            <div className="flex-1 overflow-hidden p-8">
                <div className="flex flex-col mx-auto w-full h-full">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default PublicApisLayout;

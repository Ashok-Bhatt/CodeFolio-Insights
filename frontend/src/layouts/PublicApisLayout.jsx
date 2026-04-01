import { Outlet } from 'react-router-dom';
import { BookOpen, FolderDot, HelpCircle } from 'lucide-react';
import { TabNavigation } from '../components/export.js';
import { Sidebar } from '../components/sidebars/export.js';
import { usePreferenceStore } from '../store/export.js';

const PublicApisLayout = () => {

    const { pageView } = usePreferenceStore();

    const navTabs = [
        { name: 'Documentation', path: '/public-apis/documentation', Icon: BookOpen },
        { name: 'Projects', path: '/public-apis/projects', Icon: FolderDot },
        { name: 'FAQ', path: '/public-apis/faq', Icon: HelpCircle },
    ];

    return (
        <div className={`flex-1 flex ${pageView["Public APIs"] === "tab" ? "flex-col" : "flex-row"} min-w-0 bg-white overflow-hidden h-screen`}>

            {pageView["Public APIs"] === "tab" ? <TabNavigation tabs={navTabs} /> : <Sidebar title='Public APIs' items={navTabs} />}

            <main className="flex-1 flex flex-col bg-slate-50/50 overflow-hidden">
                <Outlet />
            </main>
        </div>
    );
};

export default PublicApisLayout;

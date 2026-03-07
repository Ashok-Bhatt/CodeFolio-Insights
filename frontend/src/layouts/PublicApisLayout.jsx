import { Outlet, NavLink } from 'react-router-dom';
import { BookOpen, FolderDot } from 'lucide-react';

const PublicApisLayout = () => {
    return (
        <div className="flex flex-col h-full bg-slate-50/50">
            {/* Header/Nav for Public APIs */}
            <div className="bg-white border-b border-gray-100 p-4 shrink-0">
                <div className="max-w-6xl mx-auto flex gap-4">
                    <NavLink
                        to="/public-apis/documentation"
                        className={({ isActive }) =>
                            `flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all ${isActive ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                            }`
                        }
                    >
                        <BookOpen className="w-4 h-4" />
                        Documentation
                    </NavLink>
                    <NavLink
                        to="/public-apis/projects"
                        className={({ isActive }) =>
                            `flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all ${isActive ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                            }`
                        }
                    >
                        <FolderDot className="w-4 h-4" />
                        Projects
                    </NavLink>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-8">
                <div className="flex flex-col mx-auto w-full h-full">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default PublicApisLayout;

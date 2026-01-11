import React from "react";
import { RefreshCcw, MoreHorizontal, Github, Linkedin, Code2, Brain } from "lucide-react";

const DashboardPreview = () => {
    return (
        <div className="bg-slate-50 rounded-2xl p-6 shadow-inner border border-slate-100">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-black text-slate-800">Developer Dashboard</h3>
                <div className="flex space-x-2">
                    <button className="w-8 h-8 flex items-center justify-center rounded-xl bg-white text-slate-400 hover:text-indigo-600 shadow-sm border border-slate-100 transition-colors">
                        <RefreshCcw className="w-4 h-4" />
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-xl bg-white text-slate-400 hover:text-indigo-600 shadow-sm border border-slate-100 transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                    <div className="flex items-center space-x-2 mb-2">
                        <Github className="w-4 h-4 text-slate-800" />
                        <span className="text-xs font-black uppercase tracking-widest text-slate-500">GitHub</span>
                    </div>
                    <div className="flex justify-between items-end">
                        <div>
                            <span className="text-3xl font-black text-slate-800">342</span>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Contributions</p>
                        </div>
                        <div className="h-10 flex items-end space-x-1">
                            <div className="w-2 h-3 bg-indigo-200 rounded-sm"></div>
                            <div className="w-2 h-5 bg-indigo-300 rounded-sm"></div>
                            <div className="w-2 h-7 bg-indigo-400 rounded-sm"></div>
                            <div className="w-2 h-4 bg-indigo-300 rounded-sm"></div>
                            <div className="w-2 h-9 bg-indigo-600 rounded-sm"></div>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                    <div className="flex items-center space-x-2 mb-2">
                        <Linkedin className="w-4 h-4 text-blue-600" />
                        <span className="text-xs font-black uppercase tracking-widest text-slate-500">LinkedIn</span>
                    </div>
                    <div>
                        <span className="text-3xl font-black text-slate-800">86%</span>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Profile strength</p>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden">
                            <div className="w-[86%] h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm mb-6">
                <div className="flex items-center space-x-2 mb-4">
                    <Code2 className="w-4 h-4 text-indigo-600" />
                    <span className="text-xs font-black uppercase tracking-widest text-slate-500">Coding Performance</span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                        <div className="text-xl font-black text-slate-800">142</div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">LeetCode</p>
                    </div>
                    <div>
                        <div className="text-xl font-black text-slate-800">89</div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">GFG</p>
                    </div>
                    <div>
                        <div className="text-xl font-black text-slate-800">
                            4.8<span className="text-xs">/5</span>
                        </div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">HackerRank</p>
                    </div>
                </div>
            </div>
            <div className="bg-indigo-50/50 border border-indigo-100 p-4 rounded-xl">
                <div className="flex items-start space-x-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm border border-indigo-100">
                        <Brain className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                        <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider mb-1">AI Recommendation</h4>
                        <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                            Focus on contributing to open-source React projects to
                            strengthen your frontend expertise.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPreview;

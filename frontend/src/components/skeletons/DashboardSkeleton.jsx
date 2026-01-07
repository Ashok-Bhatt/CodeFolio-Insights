import React from 'react';

const DashboardSkeleton = () => {
    return (
        <div className="space-y-8 animate-pulse max-w-[1600px] mx-auto">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* Left Column Layout */}
                <div className="space-y-8">
                    {/* Mini Stat Cards Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        {[1, 2].map((i) => (
                            <div key={i} className="h-36 bg-white border border-slate-100 rounded-[2rem] p-6 shadow-sm">
                                <div className="h-3 w-24 bg-slate-100 rounded-full mb-4" />
                                <div className="h-8 w-16 bg-slate-200 rounded-lg" />
                                <div className="absolute top-4 right-4 w-12 h-12 bg-blue-50/50 rounded-full" />
                            </div>
                        ))}
                    </div>

                    {/* Badges Collection Skeleton */}
                    <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm h-[320px]">
                        <div className="flex justify-between items-center mb-10">
                            <div>
                                <div className="h-4 w-32 bg-slate-200 rounded-full mb-2" />
                                <div className="h-3 w-12 bg-slate-100 rounded-full" />
                            </div>
                        </div>
                        <div className="flex justify-around items-center pt-4">
                            {[1, 2].map((i) => (
                                <div key={i} className="flex flex-col items-center space-y-4">
                                    <div className="w-24 h-24 bg-slate-100 rounded-2xl rotate-45" />
                                    <div className="h-3 w-20 bg-slate-100 rounded-full" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Topic Analysis Skeleton */}
                    <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm h-[420px]">
                        <div className="h-5 w-48 bg-slate-200 rounded-full mb-8" />
                        <div className="space-y-6">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <div className="h-3 w-20 bg-slate-100 rounded-full" />
                                    <div className="flex-1 h-6 bg-slate-50 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-100/50 rounded-full" style={{ width: `${Math.random() * 60 + 20}%` }} />
                                    </div>
                                    <div className="h-3 w-8 bg-slate-100 rounded-full" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column Layout */}
                <div className="space-y-8">
                    {/* Ring/Chart Cards */}
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm min-h-[280px]">
                            <div className="text-center mb-8">
                                <div className="h-5 w-40 bg-slate-200 rounded-full mx-auto" />
                            </div>
                            <div className="flex items-center justify-center gap-12">
                                {/* Ring Placeholder */}
                                <div className="relative w-40 h-40">
                                    <div className="absolute inset-0 border-[16px] border-slate-50 rounded-full" />
                                    <div className="absolute inset-0 border-[16px] border-slate-200/40 rounded-full border-t-transparent border-r-transparent" />
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <div className="h-8 w-16 bg-slate-200 rounded-lg mb-1" />
                                        <div className="h-3 w-12 bg-slate-100 rounded-full" />
                                    </div>
                                </div>
                                {/* Legend Placeholder */}
                                <div className="space-y-4">
                                    {[1, 2, 3].map((j) => (
                                        <div key={j} className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-slate-200" />
                                            <div className="h-3 w-24 bg-slate-100 rounded-full" />
                                            <div className="h-3 w-8 bg-slate-200 rounded-full" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Full Width Activity Calendar Skeleton */}
                <div className="xl:col-span-2 bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm">
                    <div className="flex gap-16 mb-8">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i}>
                                <div className="h-3 w-16 bg-slate-100 rounded-full mb-2" />
                                <div className="h-6 w-12 bg-slate-200 rounded-lg" />
                            </div>
                        ))}
                    </div>
                    {/* Heatmap Grid Placeholder */}
                    <div className="flex flex-wrap gap-1.5 overflow-hidden">
                        {Array.from({ length: 112 }).map((_, i) => (
                            <div key={i} className="w-4 h-4 bg-slate-50 rounded-[3px]" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardSkeleton;

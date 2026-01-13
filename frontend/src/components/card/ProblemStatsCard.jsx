import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { PieChart as PieChartIcon } from "lucide-react";

const ProblemStatsCard = ({ problemsData, title = "Problem Difficulty", className = "", includeLabels = true, orientation = "vertical" }) => {
    
    const isHorizontal = orientation === "horizontal";

    return (
        <div className={`bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-gray-100 animate-float-in ${className}`}>
            <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg">
                    <PieChartIcon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-black text-gray-800 uppercase tracking-widest">{title}</h3>
            </div>

            <div className={`flex ${isHorizontal ? 'flex-col lg:flex-row items-center gap-8' : 'flex-col'}`}>
                <div className={`h-64 ${isHorizontal ? 'w-full lg:w-1/2' : 'w-full'}`}>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={problemsData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}
                                paddingAngle={4}
                                dataKey="value"
                                stroke="none"
                            >
                                {problemsData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.color}
                                    />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    background: 'rgba(255, 255, 255, 0.95)',
                                    backdropFilter: 'blur(8px)',
                                    border: 'none',
                                    borderRadius: '1rem',
                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {includeLabels && (
                    <div className={`grid ${isHorizontal ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 w-full lg:w-1/2 mt-0' : 'grid-cols-5 w-full mt-8'} gap-3`}>
                        {problemsData.map((item) => (
                            <div key={item.name} className="flex flex-col items-center justify-center p-4 rounded-2xl bg-gray-50/50 border border-gray-100 group transition-all hover:bg-white hover:shadow-md">
                                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{item.name}</div>
                                <div className="text-2xl font-black text-gray-800 tabular-nums group-hover:scale-110 transition-transform" style={{ color: item.color }}>{item.value}</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProblemStatsCard;

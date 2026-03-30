import React from 'react';
import { Search, RefreshCw, Brain } from 'lucide-react';

const UsernameInput = ({
    value,
    onChange,
    onAnalyze,
    isFetching,
    placeholder,
    title,
    subtitle,
    Icon,
    buttonText = "Deep Analysis",
    buttonLoadingText = "Analyzing...",
    bgColor = "bg-white/90"
}) => {
    return (
        <div className={`${bgColor} backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-gray-100 animate-float-in hover:shadow-2xl transition-all`} style={{ animationDelay: '100ms' }}>
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                    {Icon && <Icon className="h-6 w-6 text-white" />}
                </div>
                <div>
                    <h3 className="text-2xl font-black text-gray-800">{title}</h3>
                    <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">{subtitle}</p>
                </div>
            </div>

            <form 
                onSubmit={(e) => {
                    e.preventDefault();
                    onAnalyze();
                }}
                className="flex flex-col sm:flex-row gap-4"
            >
                <div className="flex-1 relative">
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={placeholder}
                        className="w-full p-4 pl-12 text-lg border-2 border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all bg-gray-50/50 font-bold"
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
                <button
                    type="submit"
                    disabled={isFetching || !value.trim()}
                    className="flex items-center justify-center gap-3 bg-blue-600 text-white font-black px-8 py-4 rounded-2xl shadow-xl hover:shadow-blue-200 transition-all transform hover:-translate-y-1 disabled:opacity-50 uppercase tracking-widest text-sm disabled:hover:transform-none"
                >
                    {isFetching ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Brain className="w-5 h-5" />}
                    <span>{isFetching ? buttonLoadingText : buttonText}</span>
                </button>
            </form>
        </div>
    );
};

export default UsernameInput;

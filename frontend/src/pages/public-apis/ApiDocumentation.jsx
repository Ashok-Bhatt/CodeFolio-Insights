import React, { useEffect, useRef, useState } from 'react';
import { Play, Copy, RefreshCcw, Loader2, ChevronRight, Terminal, Info, Globe, Shield } from "lucide-react";
import toast from 'react-hot-toast';
import axios from 'axios';
import { documentationData } from "../../constants/apiDocumentation.js";
import useAuthStore from "../../store/useAuthStore.js";

const ApiDocumentation = () => {
    const apiRef = useRef(null);
    const { user } = useAuthStore();
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [selectedEndpoint, setSelectedEndpoint] = useState(0);
    const [sampleApiRequest, setSampleApiRequest] = useState("");
    const [sampleApiResponse, setSampleApiResponse] = useState("");
    const [paramValues, setParamValues] = useState({});
    const [isRunning, setIsRunning] = useState(false);

    const currentEndpoint = documentationData[selectedCategory].endpoints[selectedEndpoint];

    useEffect(() => {
        const sampleRequest = currentEndpoint.example.request;
        const sampleResponse = currentEndpoint.example.response;
        setSampleApiResponse(JSON.stringify(sampleResponse, null, 2));
        setSampleApiRequest(sampleRequest);

        const initialParams = {};
        if (currentEndpoint.parameters) {
            currentEndpoint.parameters.forEach(param => {
                initialParams[param.name] = "";
            });
        }
        setParamValues(initialParams);
    }, [selectedCategory, selectedEndpoint]);

    const handleParamChange = (name, value) => {
        setParamValues(prev => ({
            ...prev,
            [name]: value,
        }));

        try {
            const url = new URL(sampleApiRequest);
            const params = new URLSearchParams(url.search);
            params.set(name, value);
            url.search = params.toString();
            setSampleApiRequest(decodeURIComponent(url.toString()));
        } catch (error) {
            // Silently handle invalid URL during typing
        }
    };

    const handleSetDefault = (param, value) => {
        handleParamChange(param.name, value || param.example);
    };

    const runSampleAPI = async () => {
        setIsRunning(true);
        try {
            const res = await axios.get(sampleApiRequest);
            setSampleApiResponse(JSON.stringify(res.data, null, 2));
        } catch (error) {
            const errorData = error?.response?.data;
            setSampleApiResponse(JSON.stringify(errorData || { message: error.message }, null, 2));
            toast.error(errorData?.message || "Something went wrong while fetching data");
        } finally {
            setIsRunning(false);
        }
    };

    const refreshSampleApiRequest = () => {
        setSampleApiRequest(currentEndpoint.example.request);
        const initialParams = {};
        if (currentEndpoint.parameters) {
            currentEndpoint.parameters.forEach(param => {
                initialParams[param.name] = "";
            });
        }
        setParamValues(initialParams);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(sampleApiRequest);
        toast.success("API Endpoint copied!");
    };

    const handleCopyResponse = () => {
        if (!sampleApiResponse) return;
        navigator.clipboard.writeText(sampleApiResponse);
        toast.success("Response copied to clipboard!");
    };

    return (
        <div className="flex h-[calc(100vh-140px)] w-full gap-6 animate-float-in">
            {/* Sidebar */}
            <aside className="w-72 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-blue-100/50 p-4 flex flex-col gap-4">
                <div className="px-2 py-1">
                    <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
                        <Globe className="w-5 h-5 text-blue-600" />
                        Platforms
                    </h2>
                </div>
                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-6">
                    {documentationData.map((category, catIndex) => (
                        <div key={catIndex} className="space-y-2">
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-3">
                                {category.category}
                            </h3>
                            <ul className="space-y-1">
                                {category.endpoints.map((ep, epIndex) => {
                                    const isActive = selectedCategory === catIndex && selectedEndpoint === epIndex;
                                    return (
                                        <li
                                            key={epIndex}
                                            onClick={() => {
                                                setSelectedCategory(catIndex);
                                                setSelectedEndpoint(epIndex);
                                            }}
                                            className={`group cursor-pointer px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-between ${isActive
                                                ? "bg-blue-600 text-white shadow-lg shadow-blue-200 translate-x-1"
                                                : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
                                                }`}
                                        >
                                            {ep.title}
                                            {isActive && <ChevronRight className="w-4 h-4" />}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ))}
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-blue-100/50 flex flex-col overflow-hidden">
                <div className="p-8 overflow-y-auto flex-1 custom-scrollbar space-y-8">
                    {/* Header */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">
                                API Reference
                            </span>
                        </div>
                        <h1 className="text-4xl font-black text-slate-800 tracking-tight">
                            {currentEndpoint.title}
                        </h1>
                        <div className="flex flex-col gap-2">
                            {currentEndpoint.description.map((desc, i) => (
                                <p key={i} className="text-slate-500 font-medium leading-relaxed">
                                    {desc}
                                </p>
                            ))}
                        </div>
                    </div>

                    {/* Method & URL */}
                    <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 font-mono text-sm group">
                        <span className="bg-green-500 text-white px-3 py-1 rounded-lg font-black text-[10px]">
                            {currentEndpoint.request.type}
                        </span>
                        <code className="text-slate-700 flex-1 truncate">
                            {currentEndpoint.request.url}
                        </code>
                    </div>

                    {/* Parameters Table */}
                    {currentEndpoint.parameters && currentEndpoint.parameters.length > 0 && (
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <Info className="w-5 h-5 text-blue-600" />
                                <h3 className="text-xl font-black text-slate-800">Parameters</h3>
                            </div>
                            <div className="overflow-hidden rounded-2xl border border-slate-100 shadow-sm">
                                <table className="w-full text-left">
                                    <thead className="bg-slate-50">
                                        <tr>
                                            <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Name</th>
                                            <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Type</th>
                                            <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Description</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 bg-white">
                                        {currentEndpoint.parameters.map((param, idx) => (
                                            <tr key={idx} className="hover:bg-blue-50/30 transition-colors">
                                                <td className="px-6 py-4 font-mono font-bold text-blue-600 text-sm">{param.name}</td>
                                                <td className="px-6 py-4">
                                                    <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-[10px] font-bold uppercase tracking-wide">
                                                        {param.type}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-slate-500 font-medium text-sm">{param.description}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Interactive Sandbox */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Play className="w-5 h-5 text-green-600" />
                            <h3 className="text-xl font-black text-slate-800">API Sandbox</h3>
                        </div>

                        <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 space-y-6">
                            {/* Request Input Area */}
                            <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm ring-1 ring-slate-100">
                                <input
                                    type="text"
                                    value={sampleApiRequest}
                                    onChange={(e) => setSampleApiRequest(e.target.value)}
                                    className="flex-1 bg-transparent border-none text-blue-600 font-mono text-sm px-4 focus:ring-0"
                                />
                                <div className="flex items-center gap-1.5 pr-2">
                                    <button
                                        onClick={handleCopy}
                                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                                        title="Copy URL"
                                    >
                                        <Copy size={16} />
                                    </button>
                                    <button
                                        onClick={refreshSampleApiRequest}
                                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                                        title="Reset"
                                    >
                                        <RefreshCcw size={16} />
                                    </button>
                                    <button
                                        onClick={runSampleAPI}
                                        disabled={isRunning}
                                        className="ml-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-200 transition-all flex items-center gap-2"
                                    >
                                        {isRunning ? (
                                            <>
                                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                                Running
                                            </>
                                        ) : (
                                            <>
                                                <Play className="w-3.5 h-3.5 fill-current" />
                                                Send Request
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Parameter Controls */}
                            {currentEndpoint.parameters && currentEndpoint.parameters.length > 0 && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {currentEndpoint.parameters.map((param, idx) => (
                                        <div key={idx} className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1 flex items-center justify-between">
                                                {param.name}
                                                {param.status === 'required' && <span className="text-red-500 font-black">*</span>}
                                            </label>
                                            <div className="flex gap-2">
                                                <input
                                                    type="text"
                                                    value={paramValues[param.name] || ""}
                                                    onChange={(e) => handleParamChange(param.name, e.target.value)}
                                                    className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-600 font-medium focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
                                                    placeholder={param.example}
                                                />
                                                {param.name === "apiKey" && user ? (
                                                    <button
                                                        onClick={() => handleSetDefault(param, user.apiKey)}
                                                        className="px-4 py-2 bg-green-50 text-green-600 border border-green-100 rounded-xl font-bold text-xs hover:bg-green-100 transition-all flex items-center gap-2"
                                                    >
                                                        <Shield className="w-3.5 h-3.5" />
                                                        Use Mine
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => handleSetDefault(param)}
                                                        className="px-4 py-2 bg-slate-100 text-slate-500 border border-slate-200 rounded-xl font-bold text-xs hover:bg-slate-200 transition-all"
                                                    >
                                                        Default
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Info Note for API Key */}
                            {!user && currentEndpoint.parameters?.some(p => p.name === "apiKey") && (
                                <div className="p-3 bg-blue-50 border border-blue-100 rounded-2xl flex gap-3 shadow-sm">
                                    <Info className="w-5 h-5 text-blue-500 shrink-0" />
                                    <p className="text-xs text-blue-700/80 font-medium">
                                        <span className="text-blue-600 font-black">PRO TIP:</span> Log in to automatically attach your personal API Keys here.
                                    </p>
                                </div>
                            )}

                            {/* Response Display */}
                            <div className="space-y-2 pt-4">
                                <div className="flex items-center justify-between px-1">
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Response</h4>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        <span className="text-[10px] font-bold text-green-600 uppercase tracking-wide">Ready</span>
                                    </div>
                                </div>
                                <div className="bg-white rounded-2xl border border-slate-200 p-6 font-mono text-sm overflow-hidden group relative shadow-inner shadow-slate-50">
                                    <div className="absolute top-0 right-5 p-3 transition-opacity flex items-center gap-2">
                                        <button
                                            onClick={handleCopyResponse}
                                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                                            title="Copy Response"
                                        >
                                            <Copy size={20} />
                                        </button>
                                    </div>
                                    <pre className="text-blue-700 custom-scrollbar max-h-[300px] overflow-auto whitespace-pre-wrap break-all leading-relaxed">
                                        {sampleApiResponse}
                                    </pre>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quotas & Limits */}
                    <div className="p-6 bg-blue-50 rounded-3xl border border-blue-100/50 space-y-3">
                        <div className="flex items-center gap-2">
                            <Info className="w-5 h-5 text-blue-600" />
                            <h3 className="text-lg font-black text-slate-800">Usage & Quotas</h3>
                        </div>
                        <p className="text-slate-600 font-medium text-sm">
                            {currentEndpoint.quotasInfo}
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ApiDocumentation;

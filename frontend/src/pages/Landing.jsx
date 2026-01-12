import React from "react";
import { Link } from "react-router-dom";
import { BarChart2, PlayCircle, ArrowRight, Github } from "lucide-react";
import { DEFAULT_USERS, LANDING_FEATURES } from "../constants/index.js";
import { Animated } from "../layouts/export.js";
import { DashboardPreview, LandingNavbar } from "../components/export.js";
import { FeatureCard } from "../components/card/export.js";
import useHighlights from "../hooks/useHighlights.js";
import { useAuthStore } from "../store/export.js";

export default function App() {
    const { highlights } = useHighlights();
    const authUser = useAuthStore((state) => state.user);

    console.log(authUser);

    return (
        <div id="webcrumbs">
            <div className="bg-gradient-to-br from-slate-50 to-indigo-100 text-slate-800 min-h-screen font-sans overflow-x-hidden">
                <LandingNavbar />

                {/* Header Section */}
                <header className="container mx-auto px-4 pt-32 pb-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <Animated>
                                <h2 className="text-4xl md:text-5xl lg:text-7xl font-black leading-tight text-slate-800">
                                    Unified Developer{" "}
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                                        Profile Analysis
                                    </span>
                                </h2>
                            </Animated>
                            <Animated delay={100}>
                                <p className="text-lg text-slate-600 font-medium leading-relaxed">
                                    Enhance your tech career with comprehensive insights from all
                                    your coding profiles. Get AI-powered recommendations and
                                    visualize your growth journey.
                                </p>
                            </Animated>
                            <Animated delay={200}>
                                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
                                    <Link to={authUser ? `/dashboard/${authUser._id}` : "/signup"}>
                                        <button className="px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black text-xs uppercase tracking-widest hover:from-indigo-700 hover:to-purple-700 transition-all flex items-center justify-center space-x-3 shadow-xl shadow-indigo-200 hover:shadow-indigo-300 transform hover:-translate-y-1">
                                            <span>Start Free Analysis</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </Link>
                                    <button className="px-8 py-4 rounded-full border-2 border-slate-200 text-slate-600 font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center justify-center space-x-3 transform hover:-translate-y-1">
                                        <PlayCircle className="w-4 h-4" />
                                        <span>Watch Demo</span>
                                    </button>
                                </div>
                            </Animated>
                            <Animated delay={300}>
                                <div className="flex items-center space-x-6 pt-6">
                                    <div className="flex -space-x-2">
                                        {(highlights.sampleUsers.length > 0 ? highlights.sampleUsers : DEFAULT_USERS).map((user, idx) => (
                                            <img
                                                key={idx}
                                                src={user.profile || "/Images/Default/user.png"}
                                                alt={user.name}
                                                className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-md"
                                            />
                                        ))}
                                        <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center border-2 border-white text-white shadow-md">
                                            <span className="text-[10px] font-black">{highlights.totalUsers > 0 ? `${highlights.totalUsers}+` : "5+"}</span>
                                        </div>
                                    </div>
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                                        Trusted by developers worldwide
                                    </p>
                                </div>
                            </Animated>
                        </div>

                        {/* Dashboard Preview */}
                        <Animated className="relative overflow-hidden" delay={200}>
                            <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-500/10 rounded-full filter blur-3xl animate-blob"></div>
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-500/10 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
                            <div className="relative bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-white shadow-2xl transform hover:-translate-y-2 transition-all duration-500 hover:shadow-indigo-500/10">
                                <DashboardPreview />
                            </div>
                        </Animated>
                    </div>
                </header>

                {/* Features Section */}
                <section id="features" className="py-24 bg-white">
                    <div className="container mx-auto px-4">
                        <Animated className="text-center mb-20">
                            <h2 className="text-3xl md:text-5xl font-black text-slate-800 mb-6">
                                Comprehensive Profile Analysis
                            </h2>
                            <p className="text-slate-500 font-bold max-w-2xl mx-auto uppercase tracking-widest text-xs">
                                Connect all your professional profiles in one place and get
                                actionable insights to boost your tech career.
                            </p>
                        </Animated>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {LANDING_FEATURES.map((feature, index) => (
                                <Animated key={feature.title} delay={index * 100}>
                                    <FeatureCard {...feature} />
                                </Animated>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Footer Section */}
                <footer className="bg-slate-50 border-t border-slate-100">
                    <div className="container mx-auto px-4 py-12">
                        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                            <div className="mb-6 md:mb-0">
                                <div className="flex items-center justify-center md:justify-start space-x-3">
                                    <BarChart2 className="text-2xl text-indigo-600" />
                                    <h1 className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-indigo-800 bg-clip-text text-transparent">CodeFolio Insights</h1>
                                </div>
                                <p className="text-slate-500 mt-2 text-xs font-black uppercase tracking-widest">
                                    Unified Developer Profile Analysis.
                                </p>
                            </div>
                            <div className="flex space-x-6">
                                <a
                                    href="#"
                                    className="p-3 bg-white rounded-xl shadow-sm border border-slate-100 text-slate-400 hover:text-indigo-600 transition-all transform hover:-translate-y-1"
                                >
                                    <Github className="w-5 h-5" onClick={() => window.open("https://github.com/VRAJESH-31/CodeFolio-Insights", "_blank")} />
                                </a>
                            </div>
                        </div>
                        <div className="text-center text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em] mt-12 pt-8 border-t border-slate-100">
                            © {new Date().getFullYear()} CodeFolio Insights. All rights
                            reserved.
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}

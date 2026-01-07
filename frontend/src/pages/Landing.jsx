import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { BarChart2, PlayCircle, ArrowRight, RefreshCcw, MoreHorizontal, Code2, Brain, Github, Linkedin, CheckCircle, FileText, LayoutDashboard, Sparkles } from "lucide-react";

// Custom hook to detect if an element is in the viewport
const useOnScreen = (options) => {
    const ref = useRef();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(entry.target);
            }
        }, options);

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [ref, options]);

    return [ref, isVisible];
};

// Animated component wrapper
const Animated = ({ children, className = "", delay = 0 }) => {
    const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
    return (
        <div
            ref={ref}
            className={`${className} transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

export default function App() {
    return (
        <div id="webcrumbs">
            <div className="bg-gradient-to-br from-slate-50 to-indigo-100 text-slate-800 min-h-screen font-sans">
                {/* Header Section */}
                <header className="container mx-auto px-4 py-8">
                    <nav className="flex justify-between items-center mb-16">
                        <div className="flex items-center space-x-2 cursor-pointer">
                            <BarChart2 className="text-3xl text-indigo-600" />
                            <h1 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-indigo-800">
                                CodeFolio Insights
                            </h1>
                        </div>
                        <div className="hidden md:flex items-center space-x-8 font-black text-xs uppercase tracking-widest text-slate-500">
                            <a
                                href="#features"
                                className="hover:text-indigo-600 transition-colors"
                            >
                                Features
                            </a>
                            <a
                                href="#how-it-works"
                                className="hover:text-indigo-600 transition-colors"
                            >
                                How it works
                            </a>
                            <a
                                href="#pricing"
                                className="hover:text-indigo-600 transition-colors"
                            >
                                Pricing
                            </a>
                            <a href="#faq" className="hover:text-indigo-600 transition-colors">
                                FAQ
                            </a>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link to="/login">
                                <button className="px-6 py-2 rounded-full border-2 border-indigo-100 font-bold text-sm hover:bg-indigo-50 transition-all transform hover:scale-105 text-indigo-600">
                                    Login
                                </button>
                            </Link>
                            <Link to="/signup">
                                <button className="px-6 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-sm hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg shadow-indigo-200">
                                    Sign Up
                                </button>
                            </Link>
                        </div>
                    </nav>

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
                                    <Link to="/signup">
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
                                        <img
                                            src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=100"
                                            alt="User 1"
                                            className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-md"
                                        />
                                        <img
                                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100"
                                            alt="User 2"
                                            className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-md"
                                        />
                                        <img
                                            src="https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?w=100"
                                            alt="User 3"
                                            className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-md"
                                        />
                                        <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center border-2 border-white text-white shadow-md">
                                            <span className="text-[10px] font-black">500+</span>
                                        </div>
                                    </div>
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                                        Trusted by developers worldwide
                                    </p>
                                </div>
                            </Animated>
                        </div>

                        {/* Dashboard Preview */}
                        <Animated className="relative" delay={200}>
                            <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-500/10 rounded-full filter blur-3xl animate-blob"></div>
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-500/10 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
                            <div className="relative bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-white shadow-2xl transform hover:-translate-y-2 transition-all duration-500 hover:shadow-indigo-500/10">
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
                                    <div className="grid grid-cols-2 gap-4 mb-6">
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
                            {[
                                {
                                    icon: <Github className="w-6 h-6 text-indigo-600" />,
                                    title: "GitHub Analysis",
                                    description:
                                        "Analyze your repository contributions, code quality, and project diversity to showcase your development expertise.",
                                    items: [
                                        "Contribution patterns",
                                        "Language proficiency",
                                        "Project impact assessment",
                                    ],
                                },
                                {
                                    icon: <Linkedin className="w-6 h-6 text-indigo-600" />,
                                    title: "LinkedIn Optimization",
                                    description:
                                        "Enhance your professional profile with insights on network growth, engagement metrics, and keyword optimization.",
                                    items: [
                                        "Profile completeness score",
                                        "Network quality analysis",
                                        "Skill endorsement strategy",
                                    ],
                                },
                                {
                                    icon: <Code2 className="w-6 h-6 text-indigo-600" />,
                                    title: "Coding Platforms",
                                    description:
                                        "Track your problem-solving progress across LeetCode, GeeksForGeeks, and other competitive programming platforms.",
                                    items: [
                                        "Problem-solving patterns",
                                        "Difficulty progression",
                                        "Skill gap identification",
                                    ],
                                },
                                {
                                    icon: <FileText className="w-6 h-6 text-indigo-600" />,
                                    title: "Resume Analysis",
                                    description:
                                        "Get detailed feedback on your resume with keyword optimization, ATS compatibility, and content suggestions.",
                                    items: [
                                        "ATS score and optimization",
                                        "Industry-specific improvements",
                                        "Impact statement enhancement",
                                    ],
                                },
                                {
                                    icon: <LayoutDashboard className="w-6 h-6 text-indigo-600" />,
                                    title: "Unified Dashboard",
                                    description:
                                        "Access all your profile metrics in one comprehensive dashboard with progress tracking and goal setting.",
                                    items: [
                                        "Cross-platform analytics",
                                        "Progress visualization",
                                        "Customizable widgets",
                                    ],
                                },
                                {
                                    icon: <Sparkles className="w-6 h-6 text-indigo-600" />,
                                    title: "AI Recommendations",
                                    description:
                                        "Receive personalized career advice and skill development recommendations based on your complete profile analysis.",
                                    items: [
                                        "Skill gap analysis",
                                        "Career path suggestions",
                                        "Learning resource curation",
                                    ],
                                },
                            ].map((feature, index) => (
                                <Animated key={feature.title} delay={index * 100}>
                                    <div className="bg-slate-50/50 p-8 rounded-3xl border border-slate-100 hover:border-indigo-600 transition-all hover:shadow-2xl hover:shadow-indigo-500/10 group h-full flex flex-col transform hover:-translate-y-2 duration-500">
                                        <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-500">
                                            {feature.icon}
                                        </div>
                                        <h3 className="text-xl font-black text-slate-800 mb-3 uppercase tracking-tight">
                                            {feature.title}
                                        </h3>
                                        <p className="text-slate-600 mb-6 flex-grow font-medium leading-relaxed">
                                            {feature.description}
                                        </p>
                                        <ul className="space-y-3 text-xs font-bold text-slate-500">
                                            {feature.items.map((item) => (
                                                <li key={item} className="flex items-center space-x-3">
                                                    <CheckCircle className="text-indigo-600 w-4 h-4" />
                                                    <span className="uppercase tracking-widest">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
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
                                    <Github className="w-5 h-5" />
                                </a>
                                <a
                                    href="#"
                                    className="p-3 bg-white rounded-xl shadow-sm border border-slate-100 text-slate-400 hover:text-indigo-600 transition-all transform hover:-translate-y-1"
                                >
                                    <Linkedin className="w-5 h-5" />
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

import { useRef, useState, useEffect } from 'react';
import { User, Palette, Camera } from 'lucide-react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/export.js';
import { useUpdateUser } from '../hooks/useUsers.js';
import toast from 'react-hot-toast';

const SettingsPage = () => {
    const authUser = useAuthStore((state) => state.user);
    const setAuthUser = useAuthStore((state) => state.setUser);
    const [user, setUser] = useState(authUser);
    const [selectedFile, setSelectedFile] = useState(null);
    const [profileImageViewUrl, setProfileImageViewUrl] = useState(user?.profilePicture || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face");
    const fileInputRef = useRef(null);

    const { mutateAsync: updateUserMutation } = useUpdateUser();

    // Sync local state when authUser changes
    useEffect(() => {
        if (authUser) setUser(authUser);
    }, [authUser]);

    const handleImageUpload = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setSelectedFile(file);
        const previewUrl = URL.createObjectURL(file);
        setProfileImageViewUrl(previewUrl);
    };

    const updateImage = async () => {
        if (!selectedFile) return;
        try {
            const formData = new FormData();
            formData.append('profileImage', selectedFile);
            const data = await updateUserMutation(formData);
            if (data) {
                const updatedUser = { ...user, profile: data.profile ?? data.profilePicture ?? user.profile };
                setUser(updatedUser);
                setAuthUser(data);
                setSelectedFile(null);
                toast.success("Profile image updated!");
            }
        } catch (error) {
            console.log(error.stack);
            toast.error("Failed to update profile image!");
        }
    }

    useEffect(() => {
        if (selectedFile) updateImage();
    }, [selectedFile]);

    const animationStyles = `
        @keyframes floatIn { 0% { opacity: 0; transform: translateY(20px) scale(0.95); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes glowPulse { 0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.2); } 50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.4); } }
        .animate-float-in { animation: floatIn 0.6s ease-out forwards; }
        .animate-glow-pulse { animation: glowPulse 3s ease-in-out infinite; }
        .active-tab { background-color: rgb(239 246 255); color: rgb(29 78 216); font-weight: 600; border: 1px solid rgb(191 219 254); }
    `;

    return (
        <div className="h-full w-full bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30 p-4 font-sans overflow-y-auto custom-scrollbar">
            <style>{animationStyles}</style>
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8 animate-float-in">
                    <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">Settings</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-1 animate-float-in" style={{ animationDelay: '100ms' }}>
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-blue-100/50 p-6">
                            <div className="text-center mb-6">
                                <div className="relative inline-block mb-4">
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-md opacity-30 animate-glow-pulse"></div>
                                    <img src={profileImageViewUrl} alt="Profile" className="relative w-24 h-24 rounded-full object-cover border-2 border-blue-500/50 shadow-lg mx-auto" />
                                    <button onClick={() => fileInputRef.current?.click()} className="absolute bottom-0 right-0 p-1.5 bg-blue-600 rounded-full border-2 border-white hover:bg-blue-700 transition-all transform hover:scale-110">
                                        <Camera className="w-4 h-4 text-white" />
                                    </button>
                                    <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
                                </div>
                                <h3 className="font-bold text-lg text-gray-800">{user?.name}</h3>
                                <p className="text-blue-600 text-sm">{user?.jobTitle}</p>
                            </div>

                            <nav className="space-y-2">
                                <NavLink
                                    to="profile"
                                    className={({ isActive }) => `w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${isActive ? 'active-tab' : 'text-gray-600 hover:bg-blue-50/50'}`}
                                >
                                    <User className="w-5 h-5" />
                                    <span className="font-medium">Profile Info</span>
                                </NavLink>
                                <NavLink
                                    to="appearance"
                                    className={({ isActive }) => `w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${isActive ? 'active-tab' : 'text-gray-600 hover:bg-blue-50/50'}`}
                                >
                                    <Palette className="w-5 h-5" />
                                    <span className="font-medium">Appearance</span>
                                </NavLink>
                            </nav>
                        </div>
                    </div>

                    <div className="lg:col-span-3 space-y-8">
                        <Outlet context={{ user, setUser }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;

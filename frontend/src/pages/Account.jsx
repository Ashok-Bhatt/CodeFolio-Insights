import { useState } from 'react';
import { ShieldCheck, Eye, EyeOff, Save, Mail, Info } from 'lucide-react';
import { useAuthStore } from '../store/export.js';
import { useChangePassword, useToggle2FA } from '../hooks/useUsers';
import toast from 'react-hot-toast';

const Account = () => {
    const user = useAuthStore((state) => state.user);
    console.log(user);
    const { mutateAsync: changePassword, isPending: isLoading } = useChangePassword();
    const { mutate: toggle2FA, isPending: isToggling2FA } = useToggle2FA();

    const [form, setForm] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [showPasswords, setShowPasswords] = useState({
        old: false,
        new: false,
        confirm: false
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const togglePasswordVisibility = (field) => {
        setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.oldPassword || !form.newPassword || !form.confirmPassword) {
            return toast.error("All fields are required!");
        }

        if (form.newPassword !== form.confirmPassword) {
            return toast.error("New passwords do not match!");
        }

        if (form.newPassword.length < 6) {
            return toast.error("Password must be at least 6 characters long!");
        }

        try {
            await changePassword({
                oldPassword: form.oldPassword,
                newPassword: form.newPassword
            });
            toast.success("Password updated successfully!");
            setForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to update password!");
        }
    };

    return (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-blue-100/50 p-8 space-y-8 animate-float-in">
            {/* Header section */}
            <div className="space-y-1">
                <h2 className="text-3xl font-black text-slate-800 flex items-center gap-3">
                    <ShieldCheck className="w-8 h-8 text-blue-600" />
                    Accounts
                </h2>
                <p className="text-slate-500 font-medium">You can manage your accounts here.</p>
            </div>

            {/* Account Information Section */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
                <h3 className="text-lg font-bold text-slate-700">Account Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center p-4 bg-slate-50/50 rounded-xl border border-slate-100 transition-all hover:shadow-md">
                    <span className="text-sm font-black text-slate-500 uppercase tracking-wider flex items-center gap-2">
                        <Mail className="w-4 h-4 text-blue-500" />
                        Email:
                    </span>
                    <span className="text-slate-700 font-semibold truncate">{user?.email}</span>
                </div>
            </div>

            {/* Update Password Section */}
            {(user?.provider === 'credential' || user?.provider === 'both') ? (
                <form onSubmit={handleSubmit} className="space-y-6 pt-4 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-slate-700">Update Password</h3>
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                            <Info className="w-3 h-3" />
                            At least 6 characters
                        </div>
                    </div>

                    <div className="space-y-4">
                        {/* Old Password */}
                        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center">
                            <label className="text-sm font-black text-slate-500 uppercase tracking-wider">Original Password:</label>
                            <div className="relative group">
                                <input
                                    type={showPasswords.old ? "text" : "password"}
                                    name="oldPassword"
                                    value={form.oldPassword}
                                    onChange={handleChange}
                                    placeholder="Old Password"
                                    className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm group-hover:border-slate-300 pr-12"
                                />
                                <button
                                    type="button"
                                    onClick={() => togglePasswordVisibility('old')}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors p-1 rounded-lg hover:bg-slate-50"
                                >
                                    {showPasswords.old ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* New Password */}
                        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center">
                            <label className="text-sm font-black text-slate-500 uppercase tracking-wider internal-label">New Password:</label>
                            <div className="relative group">
                                <input
                                    type={showPasswords.new ? "text" : "password"}
                                    name="newPassword"
                                    value={form.newPassword}
                                    onChange={handleChange}
                                    placeholder="New Password"
                                    className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm group-hover:border-slate-300 pr-12"
                                />
                                <button
                                    type="button"
                                    onClick={() => togglePasswordVisibility('new')}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors p-1 rounded-lg hover:bg-slate-50"
                                >
                                    {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center">
                            <label className="text-sm font-black text-slate-500 uppercase tracking-wider internal-label">Confirm Password:</label>
                            <div className="relative group">
                                <input
                                    type={showPasswords.confirm ? "text" : "password"}
                                    name="confirmPassword"
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Confirm Password"
                                    className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm group-hover:border-slate-300 pr-12"
                                />
                                <button
                                    type="button"
                                    onClick={() => togglePasswordVisibility('confirm')}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors p-1 rounded-lg hover:bg-slate-50"
                                >
                                    {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-black px-10 py-4 rounded-xl shadow-lg hover:shadow-indigo-200 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 uppercase tracking-widest text-xs"
                        >
                            {isLoading ? (
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <Save className="w-4 h-4" />
                            )}
                            {isLoading ? "Saving..." : "Save"}
                        </button>
                    </div>
                </form>
            ) : (
                <div className="pt-4 border-t border-slate-100 p-6 bg-blue-50/50 rounded-2xl border border-blue-100/50 flex items-start gap-4">
                    <Info className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" />
                    <div>
                        <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider mb-1">Managed by Google</h4>
                        <p className="text-xs text-slate-500 font-medium leading-relaxed">
                            Your account is managed via Google Authentication.
                        </p>
                    </div>
                </div>
            )}

            {/* Two-Factor Authentication Section */}
            {(user?.provider === 'credential' || user?.provider === 'both') && (
                <div className="pt-6 border-t border-slate-100">
                    <div className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="flex items-start gap-4">
                            <div className={`p-3 rounded-xl ${user?.enable2FA ? 'bg-green-100 text-green-600' : 'bg-slate-200 text-slate-500'}`}>
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider mb-1">Two-Factor Authentication</h4>
                                <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-xs">
                                    Secure your account with an additional verification step. You'll receive a code via email when logging in.
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => toggle2FA()}
                            disabled={isToggling2FA}
                            className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none ${user?.enable2FA ? 'bg-indigo-600' : 'bg-slate-300'}`}
                        >
                            <span
                                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${user?.enable2FA ? 'translate-x-6' : 'translate-x-1'}`}
                            />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Account;

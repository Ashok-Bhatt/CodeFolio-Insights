import { useAuthStore } from './store/export.js';
import { useCheckAuth } from './hooks/useUsers.js';
import { useEffect } from 'react';
import { Route, Routes, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Landing, LoginPage, SignupPage, CodingProfiles, PageNotFound, ContactUs } from './pages/export.js';
import { HomeLayout, DashboardLayout, AnalyzerLayout, PublicApisLayout, ProtectedLayout, SettingsLayout } from "./layouts/export.js";
import { LeetCode, GFG, Code360, Interviewbit, CodeChef, HackerRank, Github } from './pages/platforms/export.js';
import { LeetcodeAnalyze, GithubAnalyze, ResumeAnalyze } from './pages/analyze/export.js';
import { ApiDocumentation, ApiProjects, ApiFaq } from './pages/public-apis/export.js';
import { AppearanceSettings, ProfileSettings, LinkSettings, AccountSettings } from './pages/settings/export.js';

const App = () => {
    const { data, isSuccess } = useCheckAuth();
    const { user } = useAuthStore();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess && data) {
            useAuthStore.setState({ user: data.user, token: data.token });
        }
    }, [isSuccess, data]);

    useEffect(() => {
        if (user && ['/login', '/signup'].includes(location.pathname)) {
            navigate(`/dashboard/${user.displayName}`);
        }
    }, [user, location.pathname, navigate]);

    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            <Route path="/" element={<HomeLayout />}>
                <Route path="dashboard/:displayName" element={<DashboardLayout />}>
                    <Route index element={<Navigate to="coding-profiles" replace />} />
                    <Route path="coding-profiles">
                        <Route index element={<CodingProfiles />} />
                        <Route path="leetcode" element={<LeetCode />} />
                        <Route path="gfg" element={<GFG />} />
                        <Route path="code360" element={<Code360 />} />
                        <Route path="interviewbit" element={<Interviewbit />} />
                        <Route path="codechef" element={<CodeChef />} />
                        <Route path="hackerrank" element={<HackerRank />} />
                    </Route>
                    <Route path="github" element={<Github />} />
                </Route>
                <Route path="analyzer" element={<AnalyzerLayout />}>
                    <Route index element={<Navigate to="leetcode" replace />} />
                    <Route path="leetcode" element={<LeetcodeAnalyze />} />
                    <Route path="github" element={<GithubAnalyze />} />
                    <Route path="resume" element={<ResumeAnalyze />} />
                </Route>
                <Route path="public-apis" element={<PublicApisLayout />}>
                    <Route index element={<Navigate to="documentation" replace />} />
                    <Route path="documentation" element={<ApiDocumentation />} />
                    <Route path="projects" element={<ApiProjects />} />
                    <Route path="faq" element={<ApiFaq />} />
                </Route>
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="settings" element={
                    <ProtectedLayout requiresAuthentication={true}>
                        <SettingsLayout />
                    </ProtectedLayout>
                }>
                    <Route index element={<Navigate to="profile" replace />} />
                    <Route path="profile" element={<ProfileSettings />} />
                    <Route path="appearance" element={<AppearanceSettings />} />
                    <Route path="account" element={<AccountSettings />} />
                    <Route path="links" element={<LinkSettings />} />
                </Route>
            </Route>
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    )
}

export default App
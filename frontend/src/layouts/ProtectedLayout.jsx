import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/export.js';

const ProtectedLayout = ({ children, requiresAuthentication = true }) => {
    const { user } = useAuthStore();

    if (requiresAuthentication && !user) {
        return <Navigate to="/login" replace />;
    } else if (!requiresAuthentication && user) {
        return <Navigate to={`/dashboard/${user._id}`} replace />;
    } else {
        return children;
    }
};

export default ProtectedLayout;

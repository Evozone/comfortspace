import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { AuthState } from 'src/reducers/authReducer';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps): React.ReactElement | null => {
    const isSignedIn = useSelector((state: { auth: AuthState }) => state.auth.isSignedIn);
    if (isSignedIn) {
        return <>{children}</>;
    }
    return <Navigate to="/" />;
};

export default ProtectedRoute;

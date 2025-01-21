import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { ProtectedRouteProps } from '@/types/types';
import { CheckTokenExpiration } from '../CheckTokenExpiration';

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const token = localStorage.getItem('authToken');

    useEffect(() => {
        const interval = setInterval(CheckTokenExpiration, 60000);

        return () => clearInterval(interval);
    }, []);

    if (!token) {
        return <Navigate to='/signIn' />;
    }

    return children;
};

import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { ProtectedDataProps, ProtectedRouteProps } from '@/types/types';
import { CheckTokenExpiration } from '../CheckTokenExpiration';
import { LoadData } from '../LoadData';

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const token = localStorage.getItem('authToken');

    useEffect(() => {
        const interval = setInterval(CheckTokenExpiration, 60000);

        return () => clearInterval(interval);
    }, []);

    if (!token) {
        return <Navigate to='/signIn' />;
    }

    LoadData();

    return children;
};

export const ProtectedData = ({ children, itemName, route }: ProtectedDataProps) => {
    const tripId = sessionStorage.getItem(itemName);

    if (!tripId) {
        return <Navigate to={`/${route}`} />;
    }

    return children;
}

import { Children, ReactNode, useEffect, useRef } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { ProtectedDataProps, ChildrenElement } from '@/types/types';
import { CheckTokenExpiration } from '../CheckTokenExpiration';
import { LoadData } from '../LoadData';

export const ProtectedRoute = ({ children }: { children: ReactNode}) => {
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

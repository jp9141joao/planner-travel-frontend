import { ReactNode, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { ProtectedDataProps } from '@/types/types';
import { CheckTokenExpiration } from '../CheckTokenExpiration';

export const ProtectedRoute = ({ children }: { children: ReactNode}) => {
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

export const ProtectedData = ({ children, itemName, route }: ProtectedDataProps) => {
    const item: string | null = sessionStorage.getItem(itemName);
    
    if (!item) {
        return <Navigate to={`/${route}`} />;
    }

    return children;
}

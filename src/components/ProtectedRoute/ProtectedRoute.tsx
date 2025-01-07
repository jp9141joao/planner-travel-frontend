import { ProtectedRouteProps } from "@/types/types";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const token = localStorage.getItem('authToken');

    if (!token) {
        return <Navigate to='/signIn' />
    }

    return children;
}
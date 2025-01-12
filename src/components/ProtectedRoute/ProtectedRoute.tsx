import { ProtectedRouteProps } from "@/types/types";
import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const token = localStorage.getItem('authToken');


    if (token) {
        const decodedToken = jwtDecode(token);
      
        if (decodedToken.exp) {
            const currentTime = Date.now() / 1000;
        
            if (decodedToken.exp < currentTime) {
                localStorage.removeItem('authToken');
            }
        }
    } else {
        return <Navigate to='/signIn' />
    }

    return children;
}
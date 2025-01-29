import { jwtDecode } from "jwt-decode";

export const CheckTokenExpiration = () => {

    const token = localStorage.getItem('authToken');

    if (token) {
        const decodedToken: { exp?: number } = jwtDecode(token);

        if (decodedToken.exp) {
            const currentTime = Date.now() / 1000;

            if (decodedToken.exp < currentTime) {
                localStorage.removeItem('authToken');
                window.location.reload();
            }
        }
    }
};

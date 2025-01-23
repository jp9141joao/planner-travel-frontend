import { getUser } from "@/service/service";
import { setItemSessionStorage } from "./utils/utils";

export const LoadData = async () => {
    try {
        const token = localStorage.getItem('authToken');

        if (!token) {
            return
        }

        const userData = await getUser();

        if (!userData) {
            localStorage.removeItem('authToken');
            throw new Error('User data could not be retrieved from the token. Please try again.');
        }

        setItemSessionStorage('user', userData.data);
    } catch (error: any) {
        console.error(error);
        localStorage.removeItem('authToken');
    }
}
import { Login, NewPasswordUser, User } from '@/types/types';
import axios from 'axios';
const url = 'http://localhost:3000';
//const url = '.';


export const signInUser = async (login: Login) => {
    return await axios.post(`${url}/signIn`, login, {
        validateStatus: (status) => {
            return status != 400;
        }
    }); 
}

export const signUpUser = async (user: User) => {
    const response = await axios.post(`${url}/signUp`, user, {
        validateStatus: (status) => {
            return status != 400;
        }
    });
    return response;
};

export const resetPasswordUser = async (newPasswordUser: NewPasswordUser) => {
    return await axios.put(`${url}/resetPassword`, newPasswordUser, {
        validateStatus: (status) => {
            return status != 400;
        }
    });
}

export const getUser = async () => {

    const token = localStorage.getItem('authToken');

    if (!token) {
        throw new Error("Token is missing!");
    }

    const response = await axios.get(`${url}/signIn`, {
        validateStatus: (status) => status != 400, 
        headers: {
            'authorization': `Bearer ${token}`,
        },
    });

    return response;
};

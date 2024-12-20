import axios from 'axios';
const url = 'http://localhost:3001';

interface User {
    fullName: string,
    email: string,
    password: string,
    profileImage: string | null
}

export const signInUser = async (email: string, password: string) => {
    return await axios.post(`${url}/signIn`, { email, password }); 
}

export const signUpUser = async (user: User) => {
    return await axios.put(`${url}/signUp`, user);
}

export const resetPasswordUser = async (password: string) => {
    return await axios.post(`${url}/resetPassword`, password);
}
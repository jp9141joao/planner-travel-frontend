import axios from 'axios';
const url = 'http://localhost:3001';

interface User {
    fullName: string,
    email: string,
    password: string,
    profileImage: string | null
}

export const signUpUser = async (user: User) => {
    return await axios.put(`${url}/signUp`, user);
}

export const signInUser = async (user: User) => {
    return await axios.post(`${url}/signIn`, user); 
}

export const resetPasswordUser = async (password: string) => {
    return await axios.post(`${url}/resetPassword`, password);
}
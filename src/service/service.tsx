import axios from 'axios';
const url = 'http://localhost:3000';

interface User {
    fullName: string,
    email: string,
    password: string
}

export const signInUser = async (email: string, password: string) => {
    return await axios.post(`${url}/signIn`, { email, password }); 
}
export const signUpUser = async (user: User) => {
    const response = await axios.post(`${url}/signUp`, user, {
        validateStatus: (status) => {
            return status !== 400;
        }
    });
    return response;
};


export const resetPasswordUser = async (password: string) => {
    return await axios.put(`${url}/resetPassword`, password);
}
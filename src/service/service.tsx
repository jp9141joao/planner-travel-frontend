import { Login, NewPasswordUser, Trip, UpdateUserData, User } from '@/types/types';
import axios from 'axios';
import { stat } from 'fs';
const url = 'http://localhost:3000';
//const url = '.';


export const signInUser = async (login: Login) => {
    const response = await axios.post(`${url}/signIn`, login, {
        validateStatus: (status) => {
            return status != 400;
        }
    });

    return response.data;
}

export const signUpUser = async (user: User) => {
    const response = await axios.post(`${url}/signUp`, user, {
        validateStatus: (status) => {
            return status != 400;
        }
    });
    
    return response.data;
};

export const resetPasswordUser = async (newPasswordUser: NewPasswordUser) => {
    const response = await axios.put(`${url}/resetPassword`, newPasswordUser, {
        validateStatus: (status) => {
            return status != 400;
        }
    });

    return response.data
}

export const getUser = async () => {

    const token = localStorage.getItem('authToken');

    if (!token) {
        throw new Error("Token is missing!");
    }

    const response = await axios.get(`${url}/home`, {
        headers: {
            'authorization': `Bearer ${token}`,
        },
    });

    return response.data;
};

export const updateUserData = async (data: UpdateUserData) => {

    const token = localStorage.getItem('authToken');
    
    if (!token) {
        throw new Error("Token is missing!");
    }

    const response = await axios.put(`${url}/profileSettings`, data, {
        validateStatus: (status) => status != 400,
        headers: {
            'authorization': `Bearer ${token}`,
        },
    });
    return response.data;
}

export const createTrip = async (trip: Trip) => {

    const token = localStorage.getItem('authToken');

    if (!token) {
        throw new Error("Token is missing");
    }

    const response = await axios.post(`${url}/addTrips`, trip, {
        validateStatus: (status) => status != 400,
        headers: {
            'authorization': `Bearer ${token}`,
        }
    });

    return response.data;
}

export const getTrips = async () => {
    const token = localStorage.getItem('authToken');

    if (!token) {
        throw new Error("Token is missing");
    }

    const response = await axios.get(`${url}/viewTrips`, {
        validateStatus: (status) => status != 400,
        headers: {
            'authorization': `Bearer ${token}`,
        }
    });

    return response.data;
}

export const editTrip = async (trip: Trip) => {
    
    const token = localStorage.getItem('authToken');
    
    if (!token) {
        throw new Error("Token is missing!");
    }

    const response = await axios.put(`${url}/viewTrips`, trip,{
        validateStatus: (status) => status != 400,
        headers: {
            'authorization': `Bearer ${token}`,
        },
    });

    return response.data;
}

export const deleteTrip = async (tripId: string) => {
    
    const token = localStorage.getItem('authToken');
    
    if (!token) {
        throw new Error("Token is missing!");
    }

    alert(tri)

    const response = await axios.delete(`${url}/viewTrips`, {
        data: { tripId },
        validateStatus: (status) => status != 400,
        headers: {
            'authorization': `Bearer ${token}`,
        },
    });

    return response.data;
}

export const duplicateTrip = async (tripId: bigint) => {

    const token = localStorage.getItem('authToken');
    
    if (!token) {
        throw new Error("Token is missing!");
    }

    const response = await axios.post(`${url}/viewTrips`, tripId, {
        validateStatus: (status) => status != 400,
        headers: {
            'authorization': `Bearer ${token}`,
        },
    });

    return response.data;
}
import { Expense, Login, NewPasswordUser, Trip, UpdateUserData, User } from '@/types/types';
import axios from 'axios';
import { error } from 'console';
import path from 'path';
//const url = 'http://localhost:3000';
const url = '.';

{/*
export const signInUser = async (login: Login) => {

    if (!login) {
        throw new Error("Login is missing at service!");
    }

    const response = await axios.post(`${url}/signIn`, login, {
        validateStatus: (status) => {
            return status != 400;
        }
    });

    return response.data;
}

export const signUpUser = async (user: User) => {

    if (!user) {
        throw new Error("User is missing at service!");
    }

    const response = await axios.post(`${url}/signUp`, user, {
        validateStatus: (status) => {
            return status != 400;
        }
    });
    
    return response.data;
};

export const resetPasswordUser = async (newPasswordUser: NewPasswordUser) => {
    
    if (!newPasswordUser) {
        throw new Error("New password is missing at service!");
    }

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

    if (!data) {
        throw new Error("User data is missing at service!");
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

    if (!trip) {
        throw new Error("Trip is missing at service!");
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

export const getTrip = async (route: string, tripId: string) => {

    const token = localStorage.getItem('authToken');

    if (!token) {
        throw new Error("Token is missing");
    }
    
    const paths = ['tripDetails', 'editTrip', '/viewExpenses', '/itinerary', '/toDoList', '/MyPiggyBank'];

    if (!paths.includes(route)) {
        throw new Error("Route is invalid");
    }

    const response = await axios.get(`${url}${route}`, {
        params: { tripId },
        validateStatus: (status) => status != 400,
        headers: {
            'authorization': `Bearer ${token}`,
        }
    });

    return response.data;
}

export const updateNotes = async (tripId: string, notes: string) => {

    const token = localStorage.getItem('authToken');

    if (!token) {
        throw new Error("Token is missing");
    }

    const response = await axios.put(`${url}/tripDetails`, { tripId, notes }, {
        validateStatus: (status) => status != 400,
        headers: {
            'authorization': `Bearer ${token}`,
        },
    });

    return response.data;
}

export const editTrip = async (trip: Trip) => {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
        throw new Error("Token is missing!");
    }

    if (!trip) {
        throw new Error("Trip is missing at service!");
    }

    const response = await axios.put(`${url}/editTrip`, trip,{
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

    if (!tripId) {
        throw new Error("Trip ID is missing at service!");
    }

    const response = await axios.delete(`${url}/viewTrips`, {
        data: { tripId },
        validateStatus: (status) => status != 400,
        headers: {
            'authorization': `Bearer ${token}`,
        },
    });

    return response.data;
}

export const duplicateTrip = async (tripId: string) => {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
        throw new Error("Token is missing!");
    }

    if (!tripId) {
        throw new Error("Trip ID is missing at service!");
    }

    const response = await axios.post(`${url}/viewTrips`, { tripId: tripId.toString() }, {
        validateStatus: (status) => status != 400,
        headers: {
            'authorization': `Bearer ${token}`,
        },
    });

    return response.data;
}

export const getExpense = async (tripId: string, expenseId: string) => {
    const token = localStorage.getItem('authToken');

    if (!token) {
        throw new Error("Token is missing");
    }

    if (!expenseId) {
        throw new Error("Expense ID is missing")
    }

    const response = await axios.get(`${url}/editExpenses`, {
        params: { tripId },
        validateStatus: (status) => status != 400,
        headers: {
            'authorization': `Bearer ${token}`,
        }
    });

    return response.data;
}

export const getExpenses = async (tripId: string) => {
    const token = localStorage.getItem('authToken');

    if (!token) {
        throw new Error("Token is missing");
    }

    if (!tripId) {
        throw new Error("Trip ID is missing");
    }

    const response = await axios.get(`${url}/viewExpenses`, {
        params: { tripId },
        validateStatus: (status) => status != 400,
        headers: {
            'authorization': `Bearer ${token}`,
        }
    });

    return response.data;
}

export const deleteExpense = async (tripId: string, expenseId: string) => {
    const token = localStorage.getItem('authToken');

    if (!token) {
        throw new Error('Token is missing');
    }

    if (!expenseId) {
        throw new Error('Expense ID is missing');
    }

    const response = await axios.delete(`${url}'/viewExpenses'`, {
        data: { tripId, expenseId },
        validateStatus: (status) => status != 400,
        headers: {
            'authorization': `Bearer ${token}`,
        },
    });

    return response.data;
}

export const createExpense = async (expense: Expense) => {
    const token = localStorage.getItem('authToken');

    if (!token) {
        throw new Error("Token is missing");
    }

    if (!expense) {
        throw new Error("Expense is missing at service!");
    }

    const response = await axios.post(`${url}/addTrips`, expense, {
        validateStatus: (status) => status != 400,
        headers: {
            'authorization': `Bearer ${token}`,
        }
    });

    return response.data;
}
//*/}

//{/*
export const signInUser = async (login: Login) => {
    const response = { data: { error: '', success: '', data: '' } };
    return response.data;
}

export const signUpUser = async (user: User) => {
    const response = { data: { error: '', success: '', data: '' } };
    return response.data;
};

export const resetPasswordUser = async (newPasswordUser: NewPasswordUser) => {
    const response = { data: { error: '', success: '', data: '' } };
    return response.data;
}

export const getUser = async () => {
    const response = { data: { error: '', success: '', data: '' } };
    return response.data;
};

export const updateUserData = async (data: UpdateUserData) => {
    const response = { data: { error: '', success: '', data: '' } };
    return response.data;
}

export const createTrip = async (trip: Trip) => {
    const response = { data: { error: '', success: '', data: '' } };
    return response.data;
}

export const getTrips = async () => {
    const response = { data: { error: '', success: '', data: '' } };
    return response.data;
}

export const getTrip = async (route: string, tripId: string) => {
    const response = { data: { error: '', success: '', data: '' } };
    return response.data;
}

export const updateNotes = async (tripId: string ,notes: string) => {
    const response = { data: { error: '', success: '', data: '' } };
    return response.data; 
}

export const editTrip = async (trip: Trip) => {
    const response = { data: { error: '', success: '', data: '' } };
    return response.data;
}

export const deleteTrip = async (tripId: string) => {
    const response = { data: { error: '', success: '', data: '' } };
    return response.data;
}

export const getExpense = async (tripId: string) => {
    const response = { data: { error: '', success: '', data: '' } };
    return response.data;
}

export const getExpenses = async (tripId: string) => {
    const response = { data: { error: '', success: '', data: '' } };
    return response.data;
}

export const duplicateTrip = async (tripId: string) => {
    const response = { data: { error: '', success: '', data: '' } };
    return response.data;
}

export const deleteExpense = async (tripId: string, expenseId: string) => {
    const response = { data: { error: '', success: '', data: '' } };
    return response.data;
}

export const createExpense = async (tripId: string, expense: Expense) => {
    const response = { data: { error: '', success: '', data: '' } };
    return response.data;
}

export const updateExpense = async (tripId: string, expense: Expense) => {
    const response = { data: { error: '', success: '', data: '' } };
    return response.data;
}
//*/}
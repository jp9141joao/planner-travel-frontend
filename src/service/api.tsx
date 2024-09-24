// npx json-server --watch db.json --port 3001
interface DailyExpense {
    name: string,
    category: string,
    expenseShared: boolean,
    countryCurrency: string,
    value: number,
    paymentMethod: string
}

interface Day {
    number: number,
    dailyExpenseId: string[]
}

interface Activitie {
    id: string | undefined,
    name: string,
    day: number,
    startTime: string,
    endTime: string,
    note: string 
}

interface TravelExpense {
    name: string,
    type: string,
    countryCurrency: string,
    value: number
}

interface Travel {
    name: string,
    days: number,
    dayId: string[],
    travelExpenseId: string[],
    activitieId: string[]
}

import axios from "axios";
const api = axios.create({ baseURL: 'http://localhost:3001' })

export const getTravel = () => api.get(`/travel`);
export const getDay = () => api.get('/day');
export const getDailyExpense = () => api.get('/dailyExpense');
export const getTravelExpense = () => api.get('/travelExpense');
export const getActivitie = () => api.get('/activitie');


export const getTravelById = (id: string) => api.get(`/travel/${id}`);
export const getDayById = (id: string) => api.get(`/day/${id}`);
export const getDailyExpenseById = (id: string) => api.get(`/dailyExpense/${id}`);
export const getTravelExpenseById = (id: string) => api.get(`/travelExpense/${id}`);
export const getActivitieById = (id: string) => api.get(`/activitie/${id}`);


export const createTravel = (t: Travel) => api.post('/travel', t);
export const createDay = (dt: Day) => api.post(`/day`, dt);
export const createDailyExpense = (de: DailyExpense) => api.post('/dailyExpense', de);
export const createTravelExpense = (te: TravelExpense) => api.post('/travelExpense', te);
export const createActivitie = (a: Activitie) => api.post(`/activitie`, a);


export const updateTravel = (t: Travel, id: string) => api.put(`/travel/${id}`, t);
export const updateDay = (dt: Day, id: string) => api.put(`/day/${id}`, dt);
export const updateDailyExpense = (de: DailyExpense, id: string) => api.put(`/dailyExpense/${id}`, de);
export const updateTravelExpense = (te: TravelExpense, id: string) => api.put(`/travelExpense/${id}`, te);
export const updateActivitie = (a: Activitie, id: string) => api.put(`activitie/${id}`, a);


export const deleteTravel = (id: string) => api.delete(`/travel/${id}`);
export const deleteDay = (id: string) => api.delete(`/day/${id}`);
export const deleteDailyExpense = (id: string) => api.delete(`/dailyExpense/${id}`);
export const deleteTravelExpense = (id: string) => api.delete(`/travelExpense/${id}`);
export const deleteActivitie = (id: string) => api.delete(`/activitie/${id}`);


/*
export const deleteAllTravel = () => api.delete('/travels');
export const deleteAllDay = () => api.delete(`/day`);
export const deleteAllDailyExpense = () => api.delete('/dailyExpense');
export const deleteAllTravelExpense = () => api.delete(`/travelExpense`);
*/
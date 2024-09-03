import axios from "axios";

const api = axios.create({ baseURL: 'http://localhost:3001' })
 
export const getDailyExpenses = () => api.get('/dailyExpenses');
export const getTravelExpenses = () => api.get('/travelExpenses');
export const getTravel = () => api.get(`/travel`);
export const getDaysTravel = () => api.get('/daysTravel');

export const getDailyExpensesById = (id: string) => api.get(`/dailyExpenses/${id}`);
export const getTravelExpensesById = (id: string) => api.get(`travelExpenses/${id}`);
export const getTravelById = (id: string) => api.get(`/travel/${id}`);
export const getDayTravelById = (id: string) => api.get(`/daysTravel/${id}`);

export const createDailyExpenses = (de: any) => api.post('/dailyExpenses', de);
export const createTravelExpenses = (te: any) => api.post('/travelExpenses', te);
export const createTravel = (t: any) => api.post('/travel', t);
export const createDayTravel = (dt: any) => api.post(`/daysTravel`, dt);

export const updateDailyExpenses = (de: any, id: string) => api.put(`/dailyExpenses/${id}`, de);
export const updateTravelExpenses = (te: any, id: string) => api.put(`/travelExpenses/${id}`, te);
export const updateTravel = (t: any, id: string) => api.put(`/travel/${id}`, t);
export const updateDayTravel = (dt: any, id: string) => api.put(`/daysTravel/${id}`, dt);

export const deleteDailyExpenses = (id: string) => api.delete(`/dailyExpenses/${id}`);
export const deleteTravelExpenses = (id: string) => api.delete(`/travelExpenses/${id}`);
export const deleteTravel = (id: string) => api.delete(`/travel/${id}`);
export const deleteDaysTravel = (id: string) => api.delete(`/daysTravel/${id}`);

export const deleteAllDailyExpenses = () => api.delete('/dailyExpenses');
export const deleteAllTravelExpenses = () => api.delete(`/travelExpenses`);
export const deleteAllTravels = () => api.delete('/travels');
export const deleteAllDaysTravel = () => api.delete(`/daysTravel`);
 



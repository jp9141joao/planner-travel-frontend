import axios from "axios";
const api = axios.create({ baseURL: 'http://localhost:3001' })

interface DailyExpense {
    name: string,
    expenseShared: boolean,
    countryCurrency: string,
    value: number,
    day: 1
}

interface Day {
    number: number,
    dailyExpense: DailyExpense[]
}

interface TravelExpense {
    name: string,
    type: string,
    date: string,
    countryCurrency: string[],
    value: number[]
}

interface Travel {
    name: string,
    dayId: string[],
    travelExpenseId: string[]
}
 
export const getTravel = () => api.get(`/travel`);
export const getDay = () => api.get('/travel/day');
export const getDailyExpense = () => api.get('/travel/day/dailyExpense');
export const getTravelExpense = () => api.get('/travel/travelExpense');


export const getTravelById = (idTravel: string) => api.get(`/travel/${idTravel}`);
export const getDayById = (idTravel: string, idDay: string) => api.get(`travel/${idTravel}/day/${idDay}`);
export const getDailyExpenseById = (idTravel: string, idDaily: string) => api.get(`travel/${idTravel}/dailyExpense/${idDaily}`);
export const getTravelExpenseById = (id: string) => api.get(`travelExpense/${id}`);


export const createTravel = (t: Travel) => api.post('/travel', t);
export const createDay = (dt: Day) => api.post(`/travel/day`, dt);
export const createDailyExpense = (de: DailyExpense) => api.post('/travel/day/dailyExpense', de);
export const createTravelExpense = (te: TravelExpense) => api.post('travel/travelExpense', te);


export const updateTravel = (t: Travel, idTravel: string) => api.put(`/travel/${idTravel
    }`, t);
export const updateDay = (idTravel: string, dt: Day, idDay: string) => api.put(`travel/${idTravel}/day/${idDay}`, dt);
export const updateDailyExpense = ( idTravel: string, de: DailyExpense, idDaily: string) => api.put(`/travel/${idTravel}/dailyExpense/${idDaily}`, de);
export const updateTravelExpense = (idTravel: string ,te: TravelExpense, id: string) => api.put(`/travel/${idTravel}/travelExpense/${id}`, te);


export const deleteTravel = (idTravel: string) => api.delete(`/travel/${idTravel}`);
export const deleteDay = (idTravel: string, idDay: string) => api.delete(`travel/${idTravel}/day/${idDay}`);
export const deleteDailyExpense = (id: string) => api.delete(`/dailyExpense/${id}`);
export const deleteTravelExpense = (id: string) => api.delete(`/travelExpense/${id}`);


export const deleteAllTravel = () => api.delete('/travels');
export const deleteAllDay = () => api.delete(`/day`);
export const deleteAllDailyExpense = () => api.delete('/dailyExpense');
export const deleteAllTravelExpense = () => api.delete(`/travelExpense`);
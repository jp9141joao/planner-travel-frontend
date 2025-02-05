// npx json-server --watch db.json --port 3001

interface Travel {
    name: string,
    days: number,
    dayId: string[],
    activitieId: string[]
}

interface Day {
    id: string | undefined,
    number: number,
    airplaneExpenseId: string[],
    transportationExpenseId: string[],
    foodExpenseId: string[],
    attractionExpenseId: string[],
    accomodationExpenseId: string[]
}

export interface AirplaneExpense {
    id: string | undefined,
    expense: string,
    airline: string,
    origin: string,
    destination: string,
    price: number,
    countryCurrency: string,
    day: number,
}

export interface TransportationExpense {
    id: string | undefined,
    expense: string,
    type: string,
    origin: string,
    destination: string,
    price: number,
    countryCurrency: string,
    day: number,
}

export interface FoodExpense {
    id: string | undefined,
    expense: string,
    name: string,
    type: string,
    place: string,
    price: number,
    countryCurrency: string,
    day: number,
}

export interface AttractionExpense {
    id: string | undefined,
    expense: string,
    name: string,
    type: string,
    duration: number,
    price: number,
    countryCurrency: string,
    day: number,
}

export interface AccomodationExpense {
    id: string | undefined,
    expense: string,
    name: string,
    time: number,
    type: string,
    price: number,
    countryCurrency: string,
    day: number,
}

interface Activitie {
    id: string | undefined,
    name: string,
    day: number,
    startTime: string,
    endTime: string,
    note: string 
}



import axios from "axios";
const api = axios.create({ baseURL: 'http://localhost:3001' })


export const getTravel = () => api.get(`/travel`);
export const getDay = () => api.get('/day');
//export const getDailyExpense = () => api.get('/dailyExpense');
//export const getTravelExpense = () => api.get('/travelExpense');
export const getAirplaneExpense = () => api.get('/airplaneExpense');
export const getTransportationExpense = () => api.get('/transportationExpense');
export const getFoodExpense = () => api.get('/foodExpense');
export const getAttractionExpense = () => api.get('/attractionExpense');
export const getAccomodationExpense = () => api.get('/accomodationExpense');
export const getActivitie = () => api.get('/activitie');


export const getTravelById = (id: string) => api.get(`/travel/${id}`);
export const getDayById = (id: string) => api.get(`/day/${id}`);
//export const getDailyExpenseById = (id: string) => api.get(`/dailyExpense/${id}`);
//export const getTravelExpenseById = (id: string) => api.get(`/travelExpense/${id}`);
export const getAirplaneExpenseById = (id: string) => api.get(`/airplaneExpense/${id}`);
export const getTransportationExpenseById = (id: string) => api.get(`/transportationExpense/${id}`);
export const getFoodExpenseById = (id: string) => api.get(`/foodExpense/${id}`);
export const getAttractionExpenseById = (id: string) => api.get(`/attractionExpense/${id}`);
export const getAccomodationExpenseById = (id: string) => api.get(`/accomodationExpense/${id}`);
export const getActivitieById = (id: string) => api.get(`/activitie/${id}`);


export const createTravel = (t: Travel) => api.post('/travel', t);
export const createDay = (dt: Day) => api.post(`/day`, dt);
//export const createDailyExpense = (de: DailyExpense) => api.post('/dailyExpense', de);
//export const createTravelExpense = (te: TravelExpense) => api.post('/travelExpense', te);
export const createAirplaneExpense = (ae: AirplaneExpense) => api.put('/airplaneExpense', ae);
export const createTransportationExpense = (te: TransportationExpense) => api.put('/transportationExpense', te);
export const createFoodExpense = (fe: FoodExpense) => api.put('/foodExpense', fe);
export const createAttractionExpense = (ae: AttractionExpense) => api.put('/attractionExpense', ae);
export const createAccomodationExpense = (ae: AccomodationExpense) => api.put('/accomodationExpense', ae);
export const createActivitie = (a: Activitie) => api.post(`/activitie`, a);


export const updateTravel = (t: Travel, id: string) => api.put(`/travel/${id}`, t);
export const updateDay = (dt: Day, id: string) => api.put(`/day/${id}`, dt);
//export const updateDailyExpense = (de: DailyExpense, id: string) => api.put(`/dailyExpense/${id}`, de);
//export const updateTravelExpense = (te: TravelExpense, id: string) => api.put(`/travelExpense/${id}`, te);
export const updateAirplaneExpense = (ae: AirplaneExpense, id: string) => api.put(`/airplaneExpense/${id}`, ae);
export const updateTransportationExpense = (te: TransportationExpense, id: string) => api.put(`/transportationExpense/${id}`, te);
export const updateFoodExpense = (fe: FoodExpense, id: string) => api.put(`/foodExpense/${id}`, fe);
export const updateAttractionExpense = (ae: AttractionExpense, id: string) => api.put(`/attractionExpense/${id}`, ae);
export const updateAccomodationExpense = (ae: AccomodationExpense, id: string) => api.put(`/accomodationExpense/${id}`, ae);
export const updateActivitie = (a: Activitie, id: string) => api.put(`activitie/${id}`, a);


export const deleteTravel = (id: string) => api.delete(`/travel/${id}`);
export const deleteDay = (id: string) => api.delete(`/day/${id}`);
//export const deleteDailyExpense = (id: string) => api.delete(`/dailyExpense/${id}`);
//export const deleteTravelExpense = (id: string) => api.delete(`/travelExpense/${id}`);
export const deleteAirplaneExpense = (id: string) => api.delete(`/airplaneExpense/${id}`);
export const deleteTransportationExpense = (id: string) => api.delete(`/transportationExpense/${id}`);
export const deleteFoodExpense = (id: string) => api.delete(`/foodExpense/${id}`);
export const deleteAttractionExpense = (id: string) => api.delete(`/attractionExpense/${id}`);
export const deleteAccomodationExpense = (id: string) => api.delete(`/accomodationExpense/${id}`);
export const deleteActivitie = (id: string) => api.delete(`/activitie/${id}`);


/*
export const deleteAllTravel = () => api.delete('/travels');
export const deleteAllDay = () => api.delete(`/day`);
export const deleteAllDailyExpense = () => api.delete('/dailyExpense');
export const deleteAllTravelExpense = () => api.delete(`/travelExpense`);
*/
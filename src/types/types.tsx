export interface User {
    fullName: string,
    email: string,
    password: string | null | undefined,
}

export interface Login {
    email: string,
    password: string,
}

export interface NewPasswordUser {
    email: string,
    password: string,
    newPassword: string,
}

export interface UpdateUserData {
    fullName: string,
    email: string
}

export interface decodedAuthToken {
    email: string
}

export interface dataPlace {
  id: string,
  City: string,
  Country: string,
  Language: string,
  Weather: string,
  Currency: string,
  Cost: string,
  Pictures: string
};

export interface ProtectedRouteProps {
    children: JSX.Element,
}

export interface ProtectedDataProps {
    children: JSX.Element,
    itemName: string,
    route: string
}

export interface UserDetails {
    id: string
    fullName: string
    email: string
}

export interface UserContextType{
    user: UserDetails | null,
    setUser: (user: UserDetails | null) => void
}

export interface DaysIntervalContextType {
    daysInterval: number | null,
    setDaysInterval: (daysInterval: number | null) => void
} 

export interface Trip {
    id: string,
    tripName: string,
    period: string,
    daysQty: number,
    currency: string,
    budgetAmount: number,
    spent: number
    season: string,
    notes: string
}

export interface CarrouselButtonType {
    onScroll: (value: number) => void
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
    duration: string,
    price: number,
    countryCurrency: string,
    day: number,
}

export interface AccomodationExpense {
    id: string | undefined,
    expense: string,
    name: string,
    duration: number,
    type: string,
    price: number,
    countryCurrency: string,
    day: number,
}

export interface Expense {
    id: string
    tripId: string,
    type: string
    name?: string,
    category?: string,
    duration?: string,
    place?: string,
    origin?: string,
    destination?: string,
    amount: string,
    countryCurrency: string,
    day: number,
}

export interface DataButton {
    name: string,
    href: string,
    nmr: number,
    icon: React.ReactElement
}

export interface DataForm {
    operation: string, 
    type: string,
    title: string,
    subtitle: string,
    content: DataContent[]
}

export interface DataContent {
    label: string,
    status: string,
    name: string,
    element: string, 
    typeElement?: string, 
    placeHolderElement: string, 
    valueElement: string | string[]
}

export interface DialogOpen {
    operation: string,
    type: string[],
    state: boolean[],
}

export interface Operation {
    id?: string,
    type: string,
}
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
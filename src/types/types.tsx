export interface User {
    fullName: string,
    email: string,
    password: string,
    imageProfile: string | null
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

export interface decodedAuthToken {
    email: string
}

export interface ProtectedRouteProps {
    children: JSX.Element,
}

export interface UserContexType{
    user: User | null,
    setUser: (user: User | null) => void
}
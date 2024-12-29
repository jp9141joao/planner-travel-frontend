export interface User {
    fullName: string,
    email: string,
    password: string
}

export interface Login {
    email: string,
    password: string
}

export interface NewPasswordUser {
    email: string,
    password: string,
    newPassword: string
}

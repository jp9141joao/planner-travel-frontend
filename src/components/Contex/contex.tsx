import { User, UserContexType } from "@/types/types";
import { createContext, ReactNode, useContext, useState } from "react";

const UserContex = createContext<UserContexType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [ user, setUser ] = useState<User | null >(null);

    return (
        <UserContex.Provider value={{user, setUser}}>
            {children}
        </UserContex.Provider>
    )
}

export const useUser = (): UserContexType => {
    const context = useContext(UserContex);

    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }

    return context;
}
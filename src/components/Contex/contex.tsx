import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { DaysIntervalContextType, User, UserContextType, UserDetails } from "@/types/types";

const UserContext = createContext<UserContextType | null>(null);
const DaysIntervalContext = createContext<DaysIntervalContextType | null>(null);

export const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserDetails | null>(null);
    const [daysInterval, setDaysInterval] = useState<number | null>(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <DaysIntervalContext.Provider value={{ daysInterval, setDaysInterval }}>
                {children}
            </DaysIntervalContext.Provider>
        </UserContext.Provider>
    );
};


export const useUser = (): UserContextType => {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error("useUser deve ser usado dentro de um GlobalProvider");
    }

    return context;
};

export const useDaysInterval = (): DaysIntervalContextType => {
    const context = useContext(DaysIntervalContext);

    if (!context) {
        throw new Error("useUser deve ser usado dentro de um GlobalProvider");
    }

    return context;
}
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { User, UserContextType } from "@/types/types";

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error("useUser deve ser usado dentro de um UserProvider");
    }

    return context;
};

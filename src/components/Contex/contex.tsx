import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { User, UserContexType } from "@/types/types";

const UserContext = createContext<UserContexType>();

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContexType => {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error("useUser deve ser usado dentro de um UserProvider");
    }

    return context;
};

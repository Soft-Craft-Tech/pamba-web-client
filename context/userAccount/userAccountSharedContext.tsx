"use client";
import { useState, createContext } from "react";

// Context
export const UserContext = createContext();

// Provider
export const UserContextProvider = ({children}) => {
    const [activePage, setActivePage] = useState("Dashboard");
    const [mobileSidebar, setMobileSidebar] = useState(false);
    return (
        <UserContext.Provider
            value={{
                activePage,
                setActivePage,
                mobileSidebar,
                setMobileSidebar
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

// Provider wrapper
export const UserContextWrapper = ({children}) => {
    return (
        <UserContextProvider>
            {children}
        </UserContextProvider>
    )
}
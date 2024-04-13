"use client";
import {useState, createContext} from "react";

export const SettingsContext = createContext();

export const SettingsContextProvider = ({children}) => {
    const [activeTab, setActiveTab] = useState("edit");
    return (
        <SettingsContext.Provider
            value={{
                activeTab,
                setActiveTab
            }}
        >
            {children}
        </SettingsContext.Provider>
    )
}

export const SettingsContextWrapper = ({children}) => {
    return (
        <SettingsContextProvider>
            {children}
        </SettingsContextProvider>
    )
}
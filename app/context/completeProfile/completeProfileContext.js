"use client";
import { useState, createContext } from "react";

// Context
export const CompleteProfileContext = createContext();

// Provider
export const CompleteProfileProvider = ({children}) => {
    const [step, setStep] = useState(1);
    const [queuedServices, setQueuedServices] = useState([]);
    const [service, setService] = useState({id: "", price: ""});
    return (
        <CompleteProfileContext.Provider
            value={{
                step,
                setStep,
                queuedServices,
                setQueuedServices,
                service,
                setService
            }}
        >
            {children}
        </CompleteProfileContext.Provider>
    )
}

// Wrapper
export const CompleteProfileWrapper = ({children}) => {
    return (
        <CompleteProfileProvider>
            {children}
        </CompleteProfileProvider>
    )
}
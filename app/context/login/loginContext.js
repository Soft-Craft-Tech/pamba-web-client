"use client";
import { useState, createContext } from "react";

// Context
export const LoginPageContext = createContext();

// Provider
export const LoginContextProvider = ({children}) => {
    const [showToast, setShowToast] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    return <LoginPageContext.Provider
            value={{
                showToast,
                setShowToast,
                showPassword, 
                setShowPassword
            }}
        >
            {children}
        </LoginPageContext.Provider>
}

// Context Wrapper
export const LoginContextWrapper = ({children}) => {
    return <LoginContextProvider>
        {children}
    </LoginContextProvider>
}
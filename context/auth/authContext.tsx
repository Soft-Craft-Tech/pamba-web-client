"use client";
import { useState, createContext } from "react";

export const AuthPageContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [showToast, setShowToast] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        location: "",
        city: "",
        category: "",
        phone: "",
        mapUrl: "",
        password: ""
    });
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    return <AuthPageContext.Provider
            value={{
                showToast,
                setShowToast,
                formData,
                setFormData,
                termsAccepted,
                setTermsAccepted,
                showPassword,
                setShowPassword
            }}
        >
            {children}
        </AuthPageContext.Provider>
}

export const AuthContextWrapper = ({children}) => {
    return (
        <AuthContextProvider>
            {children}
        </AuthContextProvider>
    )
}
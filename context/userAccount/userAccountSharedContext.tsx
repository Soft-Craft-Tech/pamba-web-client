"use client";
import React, { useState, createContext, ReactNode } from "react";

// Define types for context values
interface UserContextValues {
  activePage: string;
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
  mobileSidebar: boolean;
  setMobileSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

// Context
export const UserContext = createContext<UserContextValues | undefined>(
  undefined
);

// Provider
export const UserContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [activePage, setActivePage] = useState<string>("Dashboard");
  const [mobileSidebar, setMobileSidebar] = useState<boolean>(false);
  const contextValues: UserContextValues = {
    activePage,
    setActivePage,
    mobileSidebar,
    setMobileSidebar,
  };
  return (
    <UserContext.Provider value={contextValues}>
      {children}
    </UserContext.Provider>
  );
};

// Provider wrapper
export const UserContextWrapper: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return <UserContextProvider>{children}</UserContextProvider>;
};

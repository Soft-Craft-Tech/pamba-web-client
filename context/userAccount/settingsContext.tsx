"use client";
import { useState, createContext, ReactNode } from "react";

interface SettingsContextValue {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const SettingsContext = createContext<SettingsContextValue | undefined>(
  undefined
);

interface SettingsContextProviderProps {
  children: ReactNode;
}

export const SettingsContextProvider = ({
  children,
}: SettingsContextProviderProps) => {
  const [activeTab, setActiveTab] = useState<string>("edit");

  const value: SettingsContextValue = {
    activeTab,
    setActiveTab,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

interface SettingsContextWrapperProps {
  children: ReactNode;
}

export const SettingsContextWrapper = ({
  children,
}: SettingsContextWrapperProps) => {
  return <SettingsContextProvider>{children}</SettingsContextProvider>;
};

export default SettingsContext;

"use client";
import { useState, createContext, ReactNode } from "react";

// Context type
interface CompleteProfileContextType {
  step: number;
  setStep: (step: number) => void;
  queuedServices: { id: string; price: string }[];
  setQueuedServices: (services: { id: string; price: string }[]) => void;
  service: { id: string; price: string };
  setService: (service: { id: string; price: string }) => void;
}

// Context
export const CompleteProfileContext = createContext<
  CompleteProfileContextType | undefined
>(undefined);

// Provider
interface CompleteProfileProviderProps {
  children: ReactNode;
}

export const CompleteProfileProvider = ({
  children,
}: CompleteProfileProviderProps) => {
  const [step, setStep] = useState(1);
  const [queuedServices, setQueuedServices] = useState<
    { id: string; price: string }[]
  >([]);
  const [service, setService] = useState<{ id: string; price: string }>({
    id: "",
    price: "",
  });

  return (
    <CompleteProfileContext.Provider
      value={{
        step,
        setStep,
        queuedServices,
        setQueuedServices,
        service,
        setService,
      }}
    >
      {children}
    </CompleteProfileContext.Provider>
  );
};

// Wrapper
interface CompleteProfileWrapperProps {
  children: ReactNode;
}

export const CompleteProfileWrapper = ({
  children,
}: CompleteProfileWrapperProps) => {
  return <CompleteProfileProvider>{children}</CompleteProfileProvider>;
};

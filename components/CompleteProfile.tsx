"use client";
import React from "react";
import BusinessDescription from "./features/profileCompletion/addDescription";
import AddExpenseAccounts from "./features/profileCompletion/addExpenseAccounts";
import AddServices from "./features/profileCompletion/addServices";
import ProfileComplete from "./features/profileCompletion/completed";
import UploadProfileImg from "./features/profileCompletion/profileImageUpload";
import { useAppSelector } from "@/hooks";
import { RootState } from "@/store/store";

const CompleteProfile = () => {
  const {
    completeProfile: { step },
  } = useAppSelector((state: RootState) => state);
  return (
    <div className="w-full h-full">
      {step === 1 && <BusinessDescription />}
      {step === 2 && <UploadProfileImg />}
      {step === 3 && <AddServices />}
      {step === 4 && <AddExpenseAccounts />}
      {step === 5 && <ProfileComplete />}
    </div>
  );
};

export default CompleteProfile;

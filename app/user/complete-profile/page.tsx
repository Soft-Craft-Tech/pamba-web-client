"use client";

import BusinessDescription from "@/components/features/profileCompletion/addDescription";
import AddExpenseAccounts from "@/components/features/profileCompletion/addExpenseAccounts";
import AddServices from "@/components/features/profileCompletion/addServices";
import ProfileComplete from "@/components/features/profileCompletion/completed";
import UploadProfileImg from "@/components/features/profileCompletion/profileImageUpload";
import { CompleteProfileContext } from "@/context/completeProfile/completeProfileContext";
import { useContext } from "react";

export default function CompleteProfile() {
  const { step } = useContext(CompleteProfileContext);
  return (
    <div className="w-full h-full">
      {step === 1 && <BusinessDescription />}
      {step === 2 && <UploadProfileImg />}
      {step === 3 && <AddServices />}
      {step === 4 && <AddExpenseAccounts />}
      {step === 5 && <ProfileComplete />}
    </div>
  );
}

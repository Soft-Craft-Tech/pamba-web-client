"use client";
import React from "react";
import BusinessDescription from "./addDescription";
import AddExpenseAccounts from "./addExpenseAccounts";
import AddServices from "./addServices";
import ProfileComplete from "./completed";
import UploadProfileImg from "./profileImageUpload";
import { useAppSelector } from "@/hooks";
import { RootState } from "@/store/store";
import { useGetProfileCompletionStatus } from "@/app/api/requests";

const CompleteProfileComponent = () => {
  const step = useAppSelector((state: RootState) => state.completeProfile.step);
  const { data } = useGetProfileCompletionStatus();
  console.log(data);
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

export default CompleteProfileComponent;

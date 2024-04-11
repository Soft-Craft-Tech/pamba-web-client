"use client";
import UploadProfileImg from "../../components/features/profileCompletion/profileImageUpload";
import { useContext } from "react";
import { CompleteProfileContext } from "../../context/completeProfile/completeProfileContext";
import AddServices from "../../components/features/profileCompletion/addServices";
import AddExpenseAccounts from "../../components/features/profileCompletion/addExpenseAccounts";
import ProfileComplete from "../../components/features/profileCompletion/completed";
import BusinessDescription from "@/app/components/features/profileCompletion/addDescription";
export default function CompleteProfile() {
    const {step} = useContext(CompleteProfileContext)
    return (
        <div className="w-full h-full">
           {step === 1 && <BusinessDescription />}
           {step === 2 && <UploadProfileImg />}
           {step === 3 && <AddServices />}
           {step === 4 && <AddExpenseAccounts />}
           {step === 5 && <ProfileComplete />}
        </div>
    )
}
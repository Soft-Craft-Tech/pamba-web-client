"use client";

import { useSelector } from "react-redux";
import BusinessInfo from "./BusinessInfo";
import CreateAccount from "./CreateAccount";
import { RootState } from "@/store/store";

export default function SignupForm() {
  const { currentStep } = useSelector((state: RootState) => state.steps);
  return <>{currentStep === 1 ? <CreateAccount /> : <BusinessInfo />}</>;
}

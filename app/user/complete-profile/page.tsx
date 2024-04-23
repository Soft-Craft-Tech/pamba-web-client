import BusinessDescription from "@/components/features/profileCompletion/addDescription";
import AddExpenseAccounts from "@/components/features/profileCompletion/addExpenseAccounts";
import AddServices from "@/components/features/profileCompletion/addServices";
import ProfileComplete from "@/components/features/profileCompletion/completed";
import UploadProfileImg from "@/components/features/profileCompletion/profileImageUpload";
import { useAppSelector } from "@/hooks";
import { RootState } from "@/store/store";

export default function CompleteProfile() {
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
}

import PasswordResetForm from "@/components/forms/resetPassword";
import { DynamicObject } from "@/components/types";

export default function ResetPassword({ params }: { params: DynamicObject }) {
  return (
    <div className="">
      <PasswordResetForm token={params?.token} />
    </div>
  );
}

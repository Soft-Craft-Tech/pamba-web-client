import VerifyAccountButton from "@/components/core/buttons/verifyAccount";
import { DynamicObject } from "@/components/types";

export default function VerifyAccount({ params }: { params: DynamicObject }) {
  return (
    <div className="w-96 h-60 flex flex-col items-center justify-center gap-5 p-10 bg-white rounded-xl shadow-xl">
      <p className="font-light text-center text-sm text-secondary">
        Please click the button to finish your account verification.
      </p>
      <VerifyAccountButton token={params?.token} />
    </div>
  );
}

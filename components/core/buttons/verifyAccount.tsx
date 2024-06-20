"use client";
import Toast from "../../shared/toasts/authToast";
import { useRouter } from "next/navigation";
import { useVerifyAccountMutation } from "@/app/api/auth";
import { setShowToast } from "@/store/toastSlice";
import { useAppDispatch } from "@/hooks";

export default function VerifyAccountButton({ token }: { token: string }) {
  const dispatch = useAppDispatch();
  const { mutate, isPending, error, isSuccess } =
    useVerifyAccountMutation(token);
  const router = useRouter();

  const handleVerify = () => {
    mutate();
    dispatch(setShowToast(true));
  };

  if (isSuccess) {
    setTimeout(() => {
      router.push("/login");
    });
  }

  return (
    <>
      {error && <Toast message={"Something went wrong"} type="error" />}
      {isSuccess && <Toast message={"Succesfully Completed"} type="success" />}
      <button
        onClick={() => {
          handleVerify();
        }}
        disabled={isPending}
        className="text-white bg-primary w-full py-3 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? "Loading" : "Verify Account"}
      </button>
    </>
  );
}

"use client";
import { useVerifyAccountMutation } from "@/app/api/auth";
import Button from "@/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function VerifyAccountButton({ token }: { token: string }) {
  const { mutate, isPending, isSuccess } = useVerifyAccountMutation(token);
  const router = useRouter();

  const handleVerify = () => {
    mutate();
    if (isSuccess) {
      toast.success("Account verified successfully!");
      router.push("/login");
    }
  };

  return (
    <Button
      variant="primary"
      onClick={() => {
        handleVerify();
      }}
      disabled={isPending}
    >
      {isPending ? "Loading..." : "Verify Account"}
    </Button>
  );
}

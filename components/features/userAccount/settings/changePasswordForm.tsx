"use client";
import { useChangePassword } from "@/app/api/auth";
import Button from "@/ui/button";
import FormField from "@/ui/FormField";
import { logoutUser } from "@/utils/auth";
import { changePasswordSchema } from "@/utils/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";

type FormValues = z.infer<typeof changePasswordSchema>;

export default function ChangePassword() {
  const router = useRouter();

  const { mutateAsync, isPending, isSuccess } = useChangePassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = async (data: FormValues) => {
    if (data?.newPassword !== data?.confirmPassword) {
      toast.warning("Passwords do not match");
    } else {
      await mutateAsync(data);
    }
  };

  if (isSuccess) {
    logoutUser();
    router.push("/login");
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <FormField
        type="password"
        placeholder="Old Password"
        name="oldPassword"
        register={register}
        error={errors.oldPassword}
      />
      <FormField
        type="password"
        placeholder="New Password"
        name="newPassword"
        register={register}
        error={errors.newPassword}
      />
      <FormField
        type="password"
        placeholder="Confirm Password"
        name="confirmPassword"
        register={register}
        error={errors.confirmPassword}
      />
      <Button type="submit" disabled={isPending} variant="primary">
        {isPending ? "Submitting" : "Save Changes"}
      </Button>
    </form>
  );
}

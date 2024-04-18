"use client";
import { useContext } from "react";
import Toast from "../../shared/toasts/authToast";
// import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function VerifyAccountButton({ token }: { token: string }) {
  //   //   const { setShowToast } = useContext(AuthPageContext);
  //   const router = useRouter();

  //   // Verification mutation
  //   const { mutate, error, isPending, data, isSuccess } = useMutation({
  //     mutationFn: async () => {
  //       const { data } = await axios.post(
  //         `https://pamba-web.onrender.com/API/businesses/activate-account/${token}`,
  //         {},
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //             "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY,
  //           },
  //         }
  //       );
  //       return data;
  //     },
  //   });

  //   const handleVerify = () => {
  //     mutate();
  //     setShowToast(true);
  //   };

  //   if (isSuccess) {
  //     setTimeout(() => {
  //       router.push("/login");
  //     });
  //   }

  return (
    <>
      {/* {error && (
        <Toast
          message={
            [401, 400, 403, 404, 409].includes(error?.response?.status)
              ? error?.response?.data?.message
              : "Something went wrong"
          }
          type="error"
        />
      )} */}
      {/* {isSuccess && <Toast message={data?.message} type="success" />} */}
      <button
        onClick={() => {}}
        disabled={false}
        className="text-white bg-primary w-full py-3 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Verify Account
      </button>
    </>
  );
}

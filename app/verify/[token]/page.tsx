"use client";

import {
  useCheckTokenExpiry,
  useResendVerificationToken,
} from "@/app/api/businesses";
import VerifyAccountButton from "@/components/core/buttons/verifyAccount";
import { DynamicObject } from "@/components/types";
import { getUser } from "@/utils/auth";
import { useEffect, useState } from "react";

export default function VerifyAccount({ params }: { params: DynamicObject }) {
  const { client } = getUser();
  const { mutateAsync } = useResendVerificationToken();
  const { mutateAsync: checkTokenExpiry } = useCheckTokenExpiry();

  const [tokenIsExpired, setTokenIsExpired] = useState<boolean>(true);


  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        const res = await checkTokenExpiry(params?.token);
        setTokenIsExpired(res?.expired);
      } catch (error) {
        setTokenIsExpired(false);
      }
    };
    checkTokenValidity();
  }, [params?.token]);

  const sendVerificationEmail = async () => {
    await mutateAsync(client?.email);
  };

  const handleRetry = async () => {
    setTokenIsExpired(true);
    await sendVerificationEmail();
  };

  return (
    <div className="w-96 h-60 flex flex-col items-center justify-center gap-5 p-10 bg-white rounded-xl shadow-xl">
      {tokenIsExpired ? (
        <>
          <p className="font-light text-center text-secondary">
            The verification token has expired. Please try again.
          </p>
          <button
            onClick={handleRetry}
            className="text-white bg-primary rounded-md py-2 px-4 font-semibold hover:bg-primaryHover"
          >
            Retry Verification
          </button>
        </>
      ) : (
        <>
          <p className="font-light text-center text-secondary">
            Please click the button to finish your account verification.
          </p>
          <VerifyAccountButton token={params?.token} />
        </>
      )}
    </div>
  );
}

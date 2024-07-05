"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/ui/button";

const Redirect = ({ params }: { params: any }) => {
  const router = useRouter();

  useEffect(() => {
    router.replace(`pamba://reset-password/${params.redirect}`);
  }, []);

  return (
    <div className="h-screen mx-auto text-center  px-4 space-y-8">
      <h2 className="font-bold text-2xl pt-12">Redirecting...</h2>
      <p className="text-xl font-medium">
        Click the button below if you're not redirected soon ;)
      </p>
      <Button
        onClick={() =>
          router.replace(`pamba://reset-password/${params.redirect}`)
        }
        className="bg-primary text-white w-full h-10 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primaryHover delay-75 duration-100"
      >
        Reset Password
      </Button>
    </div>
  );
};

export default Redirect;

"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineCheckCircle } from "react-icons/ai";
import Link from "next/link";

export default function ProfileComplete() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/user/dashboard");
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="w-full h-full bg-background flex items-center justify-center">
      <div className="w-96 h-80 bg-white rounded-sm shadow-sm p-5 flex flex-col gap-5 justify-center items-center">
        <AiOutlineCheckCircle className="w-20 h-20 text-green-500" />
        <p className="text-muted text-sm font-bold">
          You profile is now 100% complete
        </p>
        <Link
          className="bg-primary text-white rounded-full py-2 px-5"
          href="/user/dashboard"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}

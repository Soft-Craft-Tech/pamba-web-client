import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";
import SignupImageCarousel from "@/components/features/auth/signupCarousel";

export const metadata = {
  title: "Sign Up - Pamba App",
  description:
    "Sign up into Pamba, Simplify Your Operations With Effortless Business Management",
};
export default function SignupLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex w-full h-screen overflow-hidden bg-background items-center 2xl:p-10">
      <div className="h-full lg:block lg:w-1/2 overflow-hidden xl:w-2/3 2xl:rounded-tl-lg 2xl:rounded-bl-lg">
        <SignupImageCarousel />
      </div>
      <div className="w-full lg:w-1/2 p-5 h-full flex justify-center bg-white xl:p-0  2xl:rounded-tr-lg 2xl:rounded-br-lg 2xl:shadow-lg">
        <div className="w-full overflow-auto h-auto flex flex-col gap-2 lg:gap-0 sm:w-2/3 lg:w-full lg:p-10 xl:px-5">
          <div className="flex flex-col items-center w-full h-auto">
            <Link href="/">
              <Image
                className="w-36 h-auto"
                src="/logo.svg"
                alt="pamba logo"
                priority={true}
                width={40}
                height={20}
              />
            </Link>
          </div>
          {children}
          <div className="flex w-full h-6 gap-2 items-center justify-center">
            <p className="text-muted text-sm">Already have an account? </p>
            <Link className="text-secondary font-bold text-sm" href="/login">
              Login
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

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
    <main className="container flex w-full h-screen overflow-hidden bg-background items-center">
      <div className="h-full hidden lg:block lg:w-1/2 overflow-hidden">
        <SignupImageCarousel />
      </div>
      <div className="w-full lg:w-1/2 py-5 h-full flex justify-center bg-white">
        <div className="w-full overflow-auto h-auto flex flex-col gap-2 lg:gap-0 sm:w-3/4 lg:p-10 xl:px-5">
          <div className="flex flex-col items-center w-full h-auto">
            <Link href="/">
              <Image
                className="w-36 h-auto hover:scale-105 duration-100 delay-100"
                src="/logo.svg"
                alt="pamba logo"
                priority={true}
                width={40}
                height={20}
              />
            </Link>
          </div>
          {children}
        </div>
      </div>
    </main>
  );
}

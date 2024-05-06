import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";

export const metadata = {
  title: "Sign Up - Pamba App",
  description:
    "Sign up into Pamba, Simplify Your Operations With Effortless Business Management",
};
export default function SignupLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex w-full h-screen overflow-hidden bg-white items-center">
      <div className="hidden lg:block lg:w-1/2 overflow-hidden">
        <Image
          src="/signup-img.svg"
          alt=""
          width={500}
          height={400}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="w-full lg:w-1/2 px-5 py-5 h-full flex justify-center ">
        <div className="w-full overflow-auto h-auto flex flex-col gap-2 lg:gap-0 sm:w-2/3 lg:w-full lg:p-10">
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

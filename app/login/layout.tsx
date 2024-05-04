import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
export const metadata = {
  title: "Login - Pamba App",
  description: "Simplify Your Operations With Effortless Business Management",
};

export default function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <main className="w-full h-screen overflow-hidden flex justify-center items-center bg-background">
      <div className="w-full h-screen flex justify-center items-center border rounded-xl overflow-hidden bg-white lg:w-2/3 lg:h-5/6 lg:grid lg:grid-cols-2 lg:grid-rows-1 lg:gap-5">
        <div className="relative w-full h-full hidden lg:flex">
          <Image
            className="object-cover"
            src="/login-img.svg"
            alt="pamba login"
            fill={true}
          />
        </div>
        <div className="p-5 w-full h-auto text-secondary flex flex-col gap-10 items-center justify-center sm:w-2/3 lg:w-full lg:p-10 lg:gap-4">
          <div className="flex flex-col items-center w-full h-auto">
            <Link href="/">
              <Image
                className="w-36 h-auto"
                src="/logo.svg"
                alt="pamba logo"
                width={40}
                height={20}
              />
            </Link>
            <h3 className="font-medium w-max">Welcome back</h3>
          </div>
          {children}
          <div className="flex w-full h-6 gap-2 items-center justify-center">
            <p className="text-muted text-sm">Don &apos; t have an account? </p>
            <Link className="text-secondary font-bold text-sm" href="/signup">
              Signup
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

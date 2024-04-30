"use client";
import SideBarHamburger from "@/components/features/userAccount/shared/sideBarHamburger";
import SideNav from "@/components/features/userAccount/shared/sideNavigation";
import UserTopBar from "@/components/features/userAccount/shared/userTopBar";
import Link from "next/link";
import { ReactNode } from "react";
import Image from "next/image";
import { NewProvider } from "@/components/NewProvider";

export default function UserAccountLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <NewProvider>
      <main className="flex flex-col w-full h-auto bg-background gap-3 lg:flex-row">
        <div className="w-full relative lg:w-72 lg:h-screen">
          <div className="fixed w-full  flex flex-col gap-5 p-5  bg-white shadow-sm lg:w-72 lg:fixed lg:top-0 lg:left-0 lg:h-screen">
            <div className="w-full flex justify-between h-auto items-center">
              <Link href="/">
                <Image
                  className="w-32 h-auto"
                  src="/logo.svg"
                  alt="pamba logo"
                  width={40}
                  height={20}
                />
              </Link>
              <SideBarHamburger />
            </div>
            <SideNav />
          </div>
        </div>
        <div className="p-5 flex-1 flex flex-col gap-10">
          <UserTopBar />
          {children}
        </div>
      </main>
    </NewProvider>
  );
}

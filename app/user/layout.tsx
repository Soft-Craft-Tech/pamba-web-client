"use client";
import SideNav from "@/components/features/userAccount/shared/sideNavigation";
import UserTopBar from "@/components/features/userAccount/shared/userTopBar";
import { NewProvider } from "@/utils/providers/NewProvider";
import { ReactNode } from "react";

export default function UserAccountLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <NewProvider>
      <main className="flex flex-col w-full h-auto bg-background gap-3 lg:flex-row">
        <div className="w-full relative lg:w-72 lg:h-screen">
          <SideNav />
        </div>
        <div className="p-5 flex-1 flex flex-col gap-10">
          <UserTopBar />
          {children}
        </div>
      </main>
    </NewProvider>
  );
}

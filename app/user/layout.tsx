"use client";
import SideNav from "@/components/features/userAccount/shared/sideNavigation";
import UserTopBar from "@/components/features/userAccount/shared/userTopBar";
import { NewProvider } from "@/utils/providers/NewProvider";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function UserAccountLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();

  return (
    <NewProvider>
      <main
        className={`mx-auto ${
          !pathname.includes("booking") &&
          "2xl:max-w-screen-2xl xl:max-w-screen-xl"
        } w-full relative`}
      >
        <div className="flex flex-col w-full h-screen bg-background gap-8 lg:flex-row">
          <div className="w-1/6 hidden lg:flex bg-white">
            <SideNav />
          </div>
          <div className="grow py-5 space-y-8">
            <UserTopBar />
            {children}
          </div>
        </div>
      </main>
    </NewProvider>
  );
}

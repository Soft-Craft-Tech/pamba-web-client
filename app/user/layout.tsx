"use client";
import SideNav from "@/components/features/userAccount/shared/sideNavigation";
import UserTopBar from "@/components/features/userAccount/shared/userTopBar";
import { AuthProvider } from "@/utils/providers/AuthProvider";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function UserAccountLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();

  return (
    <AuthProvider>
      <main
        className={`mx-auto ${
          !pathname.includes("booking") &&
          "2xl:max-w-screen-2xl xl:max-w-screen-xl"
        } w-full relative`}
      >
        <div className="flex flex-col w-full h-full bg-background gap-8 lg:flex-row">
          <div className="w-1/6 lg:flex bg-white">
            <SideNav />
          </div>
          <div className="grow py-5 space-y-8 px-4 lg:px-0">
            <UserTopBar />
            {children}
          </div>
        </div>
      </main>
    </AuthProvider>
  );
}

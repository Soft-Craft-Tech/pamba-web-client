import { UserContextWrapper } from "@/app/context/userAccount/userAccountSharedContext";
import SideNav from "@/app/components/features/userAccount/shared/sideNavigation";
import UserTopBar from "@/app/components/features/userAccount/shared/userTopBar";

export default function UserAccountLayout({children}) {
    return (
        <UserContextWrapper>
            <main className="flex w-full h-auto bg-background gap-3">
                <div className="w-72 h-screen relative side-nav">
                    <SideNav />
                </div>
                <div className="p-5 flex-1 flex flex-col gap-10">
                    <UserTopBar />
                    {children}
                </div>
            </main>
        </UserContextWrapper>
    )
}
"use client";
import SettingsNav from "@/components/features/userAccount/settings/nav";
import PasswordSecurity from "@/components/features/userAccount/settings/password_and_security";
import EditProfile from "@/components/features/userAccount/settings/profileUpdate";
import { useAppSelector } from "@/hooks/redux";
import { RootState } from "@/store/store";

export default function Settings() {
  const {
    settingsTab: { activeTab },
  } = useAppSelector((state: RootState) => state);
  return (
    <div className="w-full h-auto rounded-xl bg-white border p-2 flex flex-col gap-10 lg:p-5">
      <SettingsNav />
      {activeTab === "edit" && <EditProfile />}
      {activeTab === "password" && <PasswordSecurity />}
      {/* {activeTab === "support" && <HelpSupport />} */}
    </div>
  );
}

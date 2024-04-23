"use client";
import HelpSupport from "@/components/features/userAccount/settings/help_and_support";
import SettingsNav from "@/components/features/userAccount/settings/nav";
import PasswordSecurity from "@/components/features/userAccount/settings/password_and_security";
import EditProfile from "@/components/features/userAccount/settings/profileUpdate";
import SettingsContext from "@/context/userAccount/settingsContext";
import { useContext } from "react";

export default function Settings() {
  const ctx = useContext(SettingsContext);

  if (!ctx) {
    return null; // or render a loading state
  }

  const { activeTab } = ctx;

  return (
    <div className="w-full h-auto rounded-xl bg-white border p-5 flex flex-col gap-10">
      <SettingsNav />
      {activeTab === "edit" && <EditProfile />}
      {activeTab === "password" && <PasswordSecurity />}
      {activeTab === "support" && <HelpSupport />}
    </div>
  );
}

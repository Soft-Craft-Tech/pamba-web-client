"use client";
import SettingsNav from "@/app/components/features/userAccount/settings/nav";
import EditProfile from "@/app/components/features/userAccount/settings/profileUpdate";
import PasswordSecurity from "@/app/components/features/userAccount/settings/password_and_security";
import { SettingsContext } from "@/app/context/userAccount/settingsContext";
import HelpSupport from "@/app/components/features/userAccount/settings/help_and_support";
import { useContext } from "react";

export default function Settings() {
    const {activeTab} = useContext(SettingsContext);
    return (
        <div className="w-full h-auto rounded-xl bg-white border p-5 flex flex-col gap-10">
            <SettingsNav />
            {activeTab === "edit" && <EditProfile />}
            {activeTab === "password" && <PasswordSecurity />}
            {activeTab == "support" && <HelpSupport />}
        </div>
    )
}
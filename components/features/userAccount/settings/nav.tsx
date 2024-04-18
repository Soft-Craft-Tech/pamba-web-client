"use client";

import React from "react";

export default function SettingsNav() {
  const [activeTab, setActiveTab] = React.useState("");
  const [, setActivePage] = React.useState("");

  const changeTab = (e: string) => {
    setActiveTab(e);
  };

  React.useEffect(() => {
    setActivePage("Settings");
  }, []);

  return (
    <div className="flex gap-20 w-full h-auto items-center shadow-sm pb-5">
      <h2
        onClick={() => {
          changeTab("edit");
        }}
        className={`cursor-pointer font-semibold p-1 ${
          activeTab === "edit"
            ? "text-primary border-b-[2px] border-primary"
            : "text-gray-500"
        } hover:scale-105`}
      >
        Edit Profile
      </h2>
      <h2
        onClick={() => {
          changeTab("password");
        }}
        className={`cursor-pointer font-semibold p-1 ${
          activeTab === "password"
            ? "text-primary border-b-[2px] border-primary"
            : "text-gray-500"
        } hover:scale-105`}
      >
        Password and Security
      </h2>
      <h2
        onClick={() => {
          changeTab("support");
        }}
        className={`cursor-pointer font-semibold p-1 ${
          activeTab === "support"
            ? "text-primary border-b-[2px] border-primary"
            : "text-gray-500"
        } hover:scale-105`}
      >
        Help and Support
      </h2>
    </div>
  );
}

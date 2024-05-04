"use client";

import { useAppDispatch, useAppSelector } from "@/hooks";
import { setActiveTab } from "@/store/settingsTabSlice";
import { RootState } from "@/store/store";
import React from "react";

export default function SettingsNav() {
  const {
    settingsTab: { activeTab },
  } = useAppSelector((state: RootState) => state);
  const dispatch = useAppDispatch();

  const changeTab = (e: string) => {
    dispatch(setActiveTab(e));
  };

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
        // onClick={() => {
        //   changeTab("support");
        // }}
        className={`font-semibold p-1 cursor-not-allowed ${
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

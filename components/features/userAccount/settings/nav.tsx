"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setActiveTab } from "@/store/settingsTabSlice";
import { RootState } from "@/store/store";

export default function SettingsNav() {
  const {
    settingsTab: { activeTab },
  } = useAppSelector((state: RootState) => state);
  const dispatch = useAppDispatch();

  const changeTab = (e: string) => {
    dispatch(setActiveTab(e));
  };

  return (
    <div className="flex gap-1 text-xs w-full h-14 items-center justify-between shadow-sm lg:justify-normal lg:gap-10 lg:text-base">
      <h2
        onClick={() => {
          changeTab("edit");
        }}
        className={`cursor-pointer w-full font-semibold p-1 lg:text-nowrap lg:w-max ${
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
        className={`cursor-pointer font-semibold p-1 w-full lg:text-nowrap lg:w-max ${
          activeTab === "password"
            ? "text-primary border-b-[2px] border-primary"
            : "text-gray-500"
        } hover:scale-105`}
      >
        Password and Security
      </h2>
      {/* <h2
        // onClick={() => {
        //   changeTab("support");
        // }}
        className={`font-semibold p-1 cursor-not-allowed w-full lg:text-nowrap lg:w-max ${
          activeTab === "support"
            ? "text-primary border-b-[2px] border-primary"
            : "text-gray-500"
        } hover:scale-105`}
      >
        Help and Support
      </h2> */}
    </div>
  );
}

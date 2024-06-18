"use client";
import { DynamicObject } from "@/components/types";
import SideBarLink, { Logout } from "./sidebarLink";
import { useAppSelector } from "@/hooks";
import { RootState } from "@/store/store";
import { sidebarData } from "@/data";

export default function SideNav() {
  const showMenu = useAppSelector(
    (state: RootState) => state.hamburger.showMenu
  );

  return (
    <div
      className={`absolute w-full top-full left-0 px-5 z-50 gap-5 bg-white ${
        showMenu ? "flex flex-col" : "hidden lg:flex"
      } lg:flex lg:flex-col lg:relative lg:px-0 lg:left-0 lg:top-0`}
    >
      <div className="flex flex-col gap-1">
        {sidebarData?.map(({ link, name, imageUrl }: DynamicObject, index) => {
          return (
            <SideBarLink key={index} link={link} name={name} image={imageUrl} />
          );
        })}
      </div>
      <div className="">
        <Logout />
      </div>
    </div>
  );
}

"use client";
import { DynamicObject } from "@/components/types";
import { sidebarData } from "@/data";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { RxHamburgerMenu } from "react-icons/rx";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import SideBarLink, { Logout } from "./sidebarLink";
import Logo from "@/public/logo.svg";

export default function SideNav() {
  const [showMenu, setShowMenu] = useState(false);
  const handleLinkClick = () => {
    setShowMenu(false);
    enablePageScroll();
  };

  return (
    <div className="w-full">
      <div className="w-full flex justify-between h-auto items-center py-6">
        <Link href="/">
          <Image
            className="w-32 h-auto"
            src={Logo}
            alt="pamba logo"
            priority={true}
            width={40}
            height={20}
          />
        </Link>
        <div className="w-auto flex h-auto items-center lg:hidden">
          {!showMenu ? (
            <RxHamburgerMenu
              size={30}
              onClick={() => {
                setShowMenu(true);
                disablePageScroll();
              }}
            />
          ) : (
            <AiOutlineClose
              size={30}
              onClick={() => {
                setShowMenu(false);
                enablePageScroll();
              }}
            />
          )}
        </div>
      </div>
      <div className="flex flex-col gap-1 w-full">
        {sidebarData?.map(({ link, name, imageUrl }: DynamicObject, index) => {
          return (
            <SideBarLink
              key={index}
              link={link}
              name={name}
              image={imageUrl}
              onClick={handleLinkClick}
            />
          );
        })}
        <Logout />
      </div>
    </div>
  );
}

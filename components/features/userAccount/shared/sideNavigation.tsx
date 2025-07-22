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
    <div className="w-screen lg:h-screen lg:flex lg:flex-col">
      <div className="w-full bg-white px-1 flex justify-between h-auto items-center py-6">
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
              className="mr-4"
              size={30}
              onClick={() => {
                setShowMenu(false);
                enablePageScroll();
              }}
            />
          )}
        </div>
      </div>
      
      {/* Mobile sidelinks */}
      {showMenu && (
        <div className="flex-col gap-1 w-full flex lg:hidden bg-white">
          {sidebarData?.map(
            ({ link, name, imageUrl }: DynamicObject, index) => {
              return (
                <SideBarLink
                  key={index}
                  link={link}
                  name={name}
                  image={imageUrl}
                  onClick={handleLinkClick}
                />
              );
            }
          )}
          <Logout />
        </div>
      )}

      {/* Desktop sidelinks */}
      <div className="w-full flex flex-col justify-between flex-1 hidden lg:flex">
        <div className="flex-col gap-1 w-full">
          {sidebarData?.map(
            ({ link, name, imageUrl }: DynamicObject, index) => {
              return (
                <SideBarLink
                  key={index}
                  link={link}
                  name={name}
                  image={imageUrl}
                  onClick={handleLinkClick}
                />
              );
            }
          )}
        </div>
        <div className="flex-col gap-1 w-full">
          <Logout />
        </div>
      </div>
    </div>
  );
}

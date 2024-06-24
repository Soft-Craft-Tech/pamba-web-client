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

export default function SideNav() {
  const [showMenu, setShowMenu] = useState(false);
  const handleLinkClick = () => {
    setShowMenu(false);
    enablePageScroll();
  };

  return (
    <div className="fixed w-full z-50 flex flex-col gap-5 p-5  bg-white shadow-sm lg:w-72 lg:fixed lg:top-0 lg:left-0 lg:h-screen">
      <div className="w-full flex justify-between h-auto items-center">
        <Link href="/">
          <Image
            className="w-32 h-auto"
            src="/logo.svg"
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
      <div
        className={`absolute w-full top-full left-0 px-5 z-50 gap-5 bg-white ${
          showMenu ? "flex flex-col" : "hidden lg:flex"
        } lg:flex lg:flex-col lg:relative lg:px-0 lg:left-0 lg:top-0`}
      >
        <div className="flex flex-col gap-1">
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
        <div className="">
          <Logout />
        </div>
      </div>
    </div>
  );
}

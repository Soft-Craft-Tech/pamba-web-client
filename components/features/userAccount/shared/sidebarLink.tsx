"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useAppSelector } from "@/hooks";
import { RootState } from "@/store/store";
import { logoutUser } from "@/utils/auth";

interface SideBarLinkProps {
  link: string;
  name: string;
  image: string;
}

const SideBarLink: React.FC<SideBarLinkProps> = ({ link, name, image }) => {
  const activePage = useAppSelector(
    (state: RootState) => state.hamburger.activePage
  );
  const matchStrings = (): boolean => {
    const pathnameWords: string[] = link.split("/");

    for (const word of pathnameWords) {
      if (word.toLowerCase() === activePage.toLowerCase()) {
        return true;
      }
    }
    return false;
  };
  const isMatch = matchStrings();

  return (
    <Link href={link} legacyBehavior>
      <a
        className={`w-full h-8 flex gap-3 items-center rounded-sm py-5 px-3 ${
          isMatch ? "bg-sideLinksBg" : ""
        }`}
      >
        <Image
          className="w-[20px] h-[20px]"
          src={image}
          alt="Pamba"
          width={24}
          height={24}
        />
        <p className="font-medium text-sm text-secondary">{name}</p>
      </a>
    </Link>
  );
};

export default SideBarLink;

export const Logout: React.FC = () => {
  const router = useRouter();

  const logOut = () => {
    logoutUser();
    router.push("/");
  };

  return (
    <div
      onClick={logOut}
      className="w-full h-8 flex gap-3 items-center rounded-sm py-5 px-3 cursor-pointer"
    >
      <Image
        className="w-[20px] h-[20px]"
        src="/user-icons/logout.svg"
        alt="Pamba"
        width={24}
        height={24}
      />
      <p className="font-medium text-sm text-secondary">Logout</p>
    </div>
  );
};

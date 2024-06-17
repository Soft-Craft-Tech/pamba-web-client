"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { logoutUser } from "@/utils/auth";
import { useAppDispatch} from "@/hooks";
import { setMobileSidebar } from "@/store/sideHamburgerSlice";
import { enablePageScroll } from "scroll-lock";

interface SideBarLinkProps {
  link: string;
  name: string;
  image: string;
}

const SideBarLink: React.FC<SideBarLinkProps> = ({ link, name, image }) => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  return (
    <Link href={link} legacyBehavior>
      <a onClick={() => {
        dispatch(setMobileSidebar(false));
        enablePageScroll();
      }}
        className={`w-full h-8 flex gap-3 items-center rounded-sm py-5 px-3 hover:scale-[1.02] delay-75 duration-100 ${
          pathname === link ? "bg-sideLinksBg" : ""
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
      className="w-full h-8 flex gap-3 items-center rounded-sm py-5 px-3 cursor-pointer hover:scale-[1.02] delay-75 duration-100"
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

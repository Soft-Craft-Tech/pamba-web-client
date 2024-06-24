"use client";
import { logoutUser } from "@/utils/auth";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

type SideBarLinkProps = {
  link: string;
  name: string;
  image: string;
  onClick?: () => void;
}

const SideBarLink: React.FC<SideBarLinkProps> = ({
  link,
  name,
  image,
  onClick,
}) => {
  const pathname = usePathname();

  return (
    <Link
      href={link}
      className={`w-full h-8 flex gap-3 items-center rounded-sm py-5 px-3 hover:scale-[1.02] delay-75 duration-100 ${
        pathname === link ? "bg-sideLinksBg" : ""
      }`}
      onClick={onClick}
    >
      <Image
        className="w-[20px] h-[20px]"
        src={image}
        alt="Pamba"
        width={24}
        height={24}
      />
      <p className="font-medium text-sm text-secondary">{name}</p>
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

import React, { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { UserContext } from "@/context/userAccount/userAccountSharedContext";
import Cookies from "universal-cookie";

interface SideBarLinkProps {
  link: string;
  name: string;
  image: string;
}

// All other sidebar nav links
const SideBarLink: React.FC<SideBarLinkProps> = ({ link, name, image }) => {
  const userContext = useContext(UserContext);

  if (!userContext) {
    // Handle the case where UserContext is undefined
    return null; // Or return a loading indicator, error message, etc.
  }

  const { activePage } = userContext;

  return (
    <Link href={link}>
      <a
        className={`w-full h-8 flex gap-3 items-center rounded-sm py-5 px-3 ${
          activePage === name ? "bg-sideLinksBg" : ""
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
    const cookies = new Cookies();
    cookies.remove("token", { path: "/", sameSite: "none", secure: true });
    cookies.remove("username", { path: "/", sameSite: "none", secure: true });
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

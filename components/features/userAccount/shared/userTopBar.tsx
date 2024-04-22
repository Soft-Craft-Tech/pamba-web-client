"use client";
import { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import Cookies from "universal-cookie";
import { UserContext } from "@/context/userAccount/userAccountSharedContext";

export default function UserTopBar() {
  const userContext = useContext(UserContext);
  if (!userContext) {
    return null;
  }
  const { activePage } = userContext;
  const cookies = new Cookies();
  const username = cookies.get("username");
  return (
    <div className="w-full h-10 bg-background flex justify-between items-center">
      <h2 className="capitalize text-lg font-semibold">{activePage}</h2>
      <div className="flex h-full items-center gap-10">
        <Image
          src="/user-icons/notifications-icon.svg"
          alt=""
          width={20}
          height={20}
        />
        <Link href={`/user/${username}/settings`}>
          <Image
            className=""
            src="/user-icons/profile-icon.svg"
            alt=""
            width={35}
            height={35}
          />
        </Link>
      </div>
    </div>
  );
}

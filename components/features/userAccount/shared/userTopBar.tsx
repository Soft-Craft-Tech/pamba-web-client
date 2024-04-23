"use client";
import Image from "next/image";
import Link from "next/link";
import Cookies from "universal-cookie";
import { usePathname } from "next/navigation";

export default function UserTopBar() {
  const pathname = usePathname();
  const lastIndex = pathname.lastIndexOf("/");
  const currentPage = pathname.slice(lastIndex + 1);

  const cookies = new Cookies();
  const username = cookies.get("username");
  return (
    <div className="w-full h-10 bg-background flex justify-between items-center">
      <h2 className="capitalize text-lg font-semibold">{currentPage}</h2>
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

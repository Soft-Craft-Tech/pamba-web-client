"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UserTopBar() {
  const pathname = usePathname();
  const lastIndex = pathname.lastIndexOf("/");
  const currentPage = pathname.slice(lastIndex + 1);
  return (
    <div className="w-full h-10 bg-background flex justify-between items-center">
      <h2 className="capitalize text-lg font-bold">{currentPage}</h2>
      <div className="flex h-full items-center gap-5">
        <Image
          src="/user-icons/notifications-icon.svg"
          alt=""
          width={25}
          height={25}
        />
        <Link href={`/user/settings`}>
          <Image
            className=""
            src="/user-icons/settings.svg"
            alt=""
            width={25}
            height={25}
          />
        </Link>
      </div>
    </div>
  );
}

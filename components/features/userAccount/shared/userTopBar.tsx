"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UserTopBar() {
  const pathname = usePathname();
  const lastIndex = pathname.lastIndexOf("/");
  const currentPage = pathname.slice(lastIndex + 1);
  return (
    <div className="w-full h-10 bg-background flex justify-between items-center mt-20 lg:mt-0">
      <h2 className="capitalize text-lg font-bold">{currentPage}</h2>
      <div className="flex h-full items-center gap-5">
        <Link className="hover:animate-bounce hover:scale-[1.02] delay-75 duration-100" href={`#`}>
          <Image
            src="/user-icons/notifications-icon.svg"
            alt=""
            width={25}
            height={25}
          />
        </Link>
        <Link className="hover:rotate-180 hover:scale-[1.02] delay-75 duration-100" href={`/user/settings`}>
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

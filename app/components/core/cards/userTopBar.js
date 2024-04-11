"use client";
import { useContext } from "react";
import Image from "next/image";
import { UserContext } from "@/app/context/userAccount/userAccountContext";

export default function UserTopBar() {
    const {activePage} = useContext(UserContext);
    return (
        <div className="w-full h-10 bg-background flex justify-between items-center">
            <h2 className="capitalize text-lg font-semibold">{activePage}</h2>
            <div className="flex h-full items-center gap-10">
                <Image src="/user-icons/notifications-icon.svg" alt="" width={20} height={20} />
                <Image className="" src="/user-icons/profile-icon.svg" alt="" width={35} height={35} />
            </div>
        </div>
    )
}
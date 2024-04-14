"use client";
import { useContext } from "react";
import {RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";
import { UserContext } from "@/app/context/userAccount/userAccountSharedContext";

export default function SideBarHamburger() {
    const {mobileSidebar, setMobileSidebar} = useContext(UserContext);

    return (
        <div className="w-auto flex h-auto items-center lg:hidden">
            {
                !mobileSidebar ? <RxHamburgerMenu size={30} onClick={() => {setMobileSidebar(true)}}  /> :
                <AiOutlineClose size={30} onClick={() => {setMobileSidebar(false)}} />
            }
        </div>
    )
}
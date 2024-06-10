"use client";
import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { RootState } from "@/store/store";
import { setMobileSidebar } from "@/store/sideHamburgerSlice";
import { disablePageScroll, enablePageScroll } from "scroll-lock";

export default function SideBarHamburger() {
  const showMenu = useAppSelector(
    (state: RootState) => state.hamburger.showMenu
  );
  const dispacth = useAppDispatch();

  return (
    <div className="w-auto flex h-auto items-center lg:hidden">
      {!showMenu ? (
        <RxHamburgerMenu
          size={30}
          onClick={() => {
            dispacth(setMobileSidebar(true));
            disablePageScroll();
          }}
        />
      ) : (
        <AiOutlineClose
          size={30}
          onClick={() => {
            dispacth(setMobileSidebar(false));
            enablePageScroll();
          }}
        />
      )}
    </div>
  );
}

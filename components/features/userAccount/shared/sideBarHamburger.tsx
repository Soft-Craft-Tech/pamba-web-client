import React, { useContext } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";
import { UserContext } from "@/context/userAccount/userAccountSharedContext";

export default function SideBarHamburger() {
  const userContext = useContext(UserContext);

  if (!userContext) {
    return null;
  }
  const { mobileSidebar, setMobileSidebar } = userContext;

  return (
    <div className="w-auto flex h-auto items-center lg:hidden">
      {!mobileSidebar ? (
        <RxHamburgerMenu
          size={30}
          onClick={() => {
            setMobileSidebar(true);
          }}
        />
      ) : (
        <AiOutlineClose
          size={30}
          onClick={() => {
            setMobileSidebar(false);
          }}
        />
      )}
    </div>
  );
}

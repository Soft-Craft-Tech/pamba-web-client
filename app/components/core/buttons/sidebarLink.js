import Link from "next/link";
import Image from "next/image";
import {useContext} from "react";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import { UserContext } from "@/app/context/userAccount/userAccountContext";

// All other sidebar nav links
export default function SideBarLink({link, name, image}) {
    const {activePage} = useContext(UserContext);
    return (
        <Link className={`w-full h-8 flex  gap-3  items-center rounded-sm py-5 px-3 ${activePage === name ? ' bg-sideLinksBg': null}`} href={link}>
            <Image className="w-[20px] h-[20px]" src={image} alt="Pamba" width={24} height={24}/>
            <p className="font-medium text-sm text-secondary">{name}</p>
        </Link>
    )
}

export const Logout = () => {
    const cookies = new Cookies();
    const router = useRouter();

    const logOut = () => {
        cookies.remove("token", data?.authToken, {path: "/", sameSite: "None", secure:true});
        cookies.remove("username", data?.client?.slug, {path: "/", sameSite: "None", secure:true});
        router.push("/");
    }

    return (
        <div onClick={logOut} className="w-full h-8 flex  gap-3  items-center rounded-sm py-5 px-3">
            <Image className="w-[20px] h-[20px]" src="/user-icons/logout.svg" alt="Pamba" width={24} height={24}/>
            <p className="font-medium text-sm text-secondary">Logout</p>
        </div>
    )
}
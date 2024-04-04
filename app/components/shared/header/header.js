"use client";
import Link from "next/link";
import Image from "next/image";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {RxCaretDown} from "react-icons/rx";

export default function Header({page}) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [toggleServices, setToggleServices] = useState(false);
    const router = useRouter();
    const cookies = new Cookies();
    const token = cookies.get("token");

    // LogOut User
    const logOut = () => {
        setIsLoggedIn(false);
        cookies.remove("token", {path: "/", sameSite: "None", secure:true});
        cookies.remove("username", {path: "/", sameSite: "None", secure:true});
        router.push("/");
    }

    useEffect(() => {
        if (token) {
            setIsLoggedIn(true);
        }
    }, [isLoggedIn]);

    return (
        <section className="w-full h-20 flex items-center justify-center border-b-[0.5px] border-borders">
            <div className="fixed shadow-sm w-full h-20 flex justify-between items-center font-medium text-gray-800 text-base bg-white z-30 px-20">
                <Link className="h-full w-auto" href="/">
                    <Image className="w-40 h-full" src="/logo.svg" alt="pamba-logo" width={64} height={32} />
                </Link>
                <div className="flex gap-12">
                    <Link className={`py-3 px-5 flex h-full items-center ${page === "home" ? "text-primary" : undefined}`} href="/">Home</Link>
                    <Link className={`py-3 px-5 flex h-full items-center ${page === "about" ? "text-primary" : undefined}`} href="/about">About Us</Link>
                    <div onClick={() => {setToggleServices(prev => !prev)}} className={`relative py-3 px-5 flex gap-1 h-full items-center ${["reporting", "scheduling", "business"].includes(page) ? "text-primary" : undefined}`} href="#">
                        <p className="cursor-pointer">Services</p>
                        <RxCaretDown size={20} />
                        {toggleServices && <div className="absolute flex flex-col items-center px-2 py-4 gap-1 top-full left-0 w-48 rounded-sm h-auto bg-white z-20">
                            <Link className={`text-sm font-light border-b w-full text-center py-[5px] ${page === "business" ? "text-primary": "text-secondary"}`} href="/services/business-management">Business Management</Link>
                            <Link className={`text-sm font-light border-b w-full text-center py-[5px] ${page === "scheduling" ? "text-primary": "text-secondary"}`} href="/services/scheduling">Appointment Scheduling</Link>
                            <Link className={`text-sm font-light border-b w-full text-center py-[5px] ${page === "reporting" ? "text-primary": "text-secondary"}`} href="/services/reporting">Reporting and Analytics</Link>
                        </div>}
                    </div>
                </div>
                <div className="h-full items-center flex gap-10 font-semibold">
                    {!isLoggedIn ?
                        <>
                            <Link className="" href="/login">Login</Link>
                            <Link className="bg-primary text-white px-5 py-2 rounded-lg" href="/signup">Sign Up</Link>
                        </> : 
                        <>
                            <button type="button" onClick={logOut}>Logout</button>
                            <Link className="bg-primary text-white px-5 py-2 rounded-lg" href="#">Dashboard</Link>  
                        </>
                    }
                </div>
            </div>
        </section>
    )
}   
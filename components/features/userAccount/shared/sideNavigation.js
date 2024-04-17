"use client";
import SideBarLink, {Logout} from "./sidebarLink";
import Cookies from "universal-cookie";
import { UserContext } from "@/app/context/userAccount/userAccountSharedContext";
import { useContext } from "react";

export default function SideNav() {
    const {mobileSidebar} = useContext(UserContext);
    const cookies = new Cookies();
    const username = cookies.get("username");
    return (
        <div className={`absolute w-full top-full left-0 px-5 z-10 gap-5 bg-white ${mobileSidebar ? 'flex flex-col' : 'hidden lg:flex'} lg:flex lg:flex-col lg:relative lg:px-0 lg:left-0 lg:top-0`} >
            <div className="flex flex-col gap-1" >
                <SideBarLink link={`/user/${username}/dashboard`} name="Dashboard" image="/user-icons/dashboard.svg" />
                <SideBarLink link={`/user/${username}/sheduling`} name="Sheduling" image="/user-icons/calendar.svg" />
                <SideBarLink link={`/user/${username}/revenue`} name="Revenue" image="/user-icons/revenue.svg" />
                <SideBarLink link={`/user/${username}/clients`} name="Clients" image="/user-icons/client.svg" />
                <SideBarLink link={`/user/${username}/staff`} name="Staff" image="/user-icons/staff.svg" />
                <SideBarLink link={`/user/${username}/services`} name="Services" image="/user-icons/services.svg" />
                <SideBarLink link={`/user/${username}/expenses`} name="Expenses" image="/user-icons/expenses.svg" />
                <SideBarLink link={`/user/${username}/inventory`} name="Inventory" image="/user-icons/inventory.svg" />
                <SideBarLink link={`/user/${username}/reviews`} name="Reviews" image="/user-icons/settings.svg" />
            </div>
            <div className="" >
                <Logout />
            </div>
        </div>
    )
}
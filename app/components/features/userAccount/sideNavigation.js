"use client";
import SideBarLink, {Logout} from "../../core/buttons/sidebarLink";
import Image from "next/image";
import Link from "next/link"

export default function SideNav() {
    return (
        <div className="fixed w-72 h-screen flex flex-col gap-5 top-0 left-0 p-5  bg-white shadow-sm">
            <div>
                <Link href="/">
                    <Image className="w-32 h-auto" src="/logo.svg" alt="pamba logo" width={40} height={20} />
                </Link>
            </div>
            <div className="flex flex-col gap-1">
                <SideBarLink link={`/user/ggg/dashboard`} name="Dashboard" image="/user-icons/dashboard.svg" />
                <SideBarLink link={`/user/ggg/sheduling`} name="Sheduling" image="/user-icons/calendar.svg" />
                <SideBarLink link={`/user/ggg/revenue`} name="Revenue" image="/user-icons/revenue.svg" />
                <SideBarLink link={`/user/ggg/clients`} name="Clients" image="/user-icons/client.svg" />
                <SideBarLink link={`/user/ggg/staff`} name="Staff" image="/user-icons/staff.svg" />
                <SideBarLink link={`/user/ggg/services`} name="Services" image="/user-icons/services.svg" />
                <SideBarLink link={`/user/ggg/expenses`} name="Expenses" image="/user-icons/expenses.svg" />
                <SideBarLink link={`/user/ggg/inventory`} name="Inventory" image="/user-icons/inventory.svg" />
                <SideBarLink link={`/user/ggg/settings`} name="Settings" image="/user-icons/settings.svg" />
            </div>
            <div className="">
                <Logout />
            </div>
        </div>
    )
}
import Link from "next/link";
import Image from "next/image";
export default function Header({page}) {
    return (
        <section className="w-full h-20 flex items-center justify-center border-b-[0.5px] border-borders px-20">
            <div className="w-full h-full flex justify-between items-center font-medium text-gray-800 text-base">
                <Link className="h-full w-auto" href="/">
                    <Image className="w-40 h-full" src="/logo.svg" alt="pamba-logo" width={64} height={32} />
                </Link>
                <div className="flex gap-12">
                    <Link className={page === "home" ? "text-primary" : undefined} href="/">Home</Link>
                    <Link className={page === "about" ? "text-primary" : undefined} href="/">About Us</Link>
                    <Link className={page === "services" ? "text-primary" : undefined} href="/">Services</Link>
                </div>
                <div className="h-full items-center flex gap-10 font-semibold">
                    <Link className="" href="/">Login</Link>
                    <Link className="bg-primary text-white px-5 py-2 rounded-lg" href="/">Sign Up</Link>
                </div>
            </div>
        </section>
    )
}   
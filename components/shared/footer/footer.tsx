import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    const today = new Date();
    const year = today.getFullYear()
    return (
        <section className="bg-secondary py-10 px-5 pb-5 text-white h-auto flex flex-col gap-10 sm:px-10 lg:px-20">
            <div className="flex flex-col-reverse gap-5 sm:gap-10 lg:gap-0 sm:flex-row lg:grid lg:grid-cols-2 lg:grid-rows-1" >
                <div className="w-full h-full flex flex-col gap-2 sm:w-max md:w-full">
                    <Link href="/">
                        <Image className="w-auto h-14" src="/logo-white.svg" alt="pamba-logo" width={96} height={32} />
                    </Link>
                    <div className="flex gap-2">
                        <Link className="w-7" href="/">
                            <Image className="w-auto h-10" src="/facebook.svg" alt="pamba-logo" width={64} height={32} />
                        </Link>
                        <Link className="w-7" href="/">
                            <Image className="w-auto h-10" src="/instagram.svg" alt="pamba-logo" width={64} height={32} />
                        </Link>
                        <Link className="w-7" href="/">
                            <Image className="w-auto h-10" src="/x.svg" alt="pamba-logo" width={64} height={32} />
                        </Link>
                        <Link className="w-7" href="/">
                            <Image className="w-auto h-10" src="/linkedin.svg" alt="pamba-logo" width={64} height={32} />
                        </Link>
                    </div>
                </div>
                <div className="w-full h-full gap-5 grid grid-cols-2 grid-rows-1 md:gap-10">
                    <div className="flex flex-col gap-3">
                        <h3 className="font-extrabold text-lg lg:text-sm ">Services</h3>
                        <div className="text-sm font-semibold text-gray-300 flex flex-col gap-1 lg:text-xs">
                            <p>Client Bookings</p>
                            <p>Inventory Management</p>
                            <p>Sales Management</p>
                            <p>Expense Management</p>
                            <p>Staff Management</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <h3 className="font-extrabold text-lg lg:text-sm">Legal</h3>
                        <div className="text-sm font-semibold text-gray-300 flex flex-col gap-1 lg:text-xs">
                            <Link href="/privacy-policy">Privacy Policy</Link>
                            <Link href="/privacy-policy">Terms of Use</Link>
                        </div>
                    </div>
                </div>
            </div>
            <p className="text-center text-xs font-light text-gray-400">
                © {year} pamba. All rights reserved
            </p>
        </section>
    )
}
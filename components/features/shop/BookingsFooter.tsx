import Link from "next/link";
import Image from "next/image";

const BookingsFooter = () => {
    const today = new Date();
    const year = today.getFullYear()
    return (
        <section className="bg-secondary py-10 px-5 pb-5 text-white h-auto flex flex-col gap-10 sm:px-10 lg:px-20">
            <div className="w-full h-auto flex flex-col gap-5 sm:gap-10 items-center lg:gap-0" >
                <Link href="/">
                    <Image className="w-auto h-20" src="/logo-white.svg" alt="pamba-logo" width={96} height={32} />
                </Link>
                <div className="w-full h-full flex flex-col gap-2 justify-between items-center sm:flex-row sm:w-max md:w-full">
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
                    <p className="text-center text-xs font-light text-gray-400">
                        © {year} pamba. All rights reserved
                    </p>
                    <div className="flex items-center gap-10 font-light text-sm text-gray-200">
                        <Link href="/terms-and-conditions">Terms of Use</Link>
                        <Link href="/privacy-policy">Privacy Policy</Link>
                    </div>
                </div>
                
            </div>
        </section>
    )
}

export default BookingsFooter;
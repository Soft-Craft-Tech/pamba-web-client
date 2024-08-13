import Image from "next/image";
import Link from "next/link";

export default function ContactCTA() {
    return (
        <div className="px-5 py-14 flex flex-col-reverse gap-6 w-full bg-secondary text-white sm:px-10 lg:px-20 lg:flex-row lg:gap-0 lg:justify-between lg:items-center">
            <div className="flex flex-col gap-5">
                <h3 className="text-4xl font-extrabold sm:text-5xl lg:text-left lg:w-[18ch]">
                    Do you need a more customized solution?
                </h3>
                <p className="text-gray-300 lg:w-[40ch] sm:text-2xl lg:text-base">
                    We understand that businesses are different and you may need a more personalized solution. 
                    Let&apos;s work with you to curate the ideal solution for your current and future needs.
                </p>
                <Link className="border border-primary text-primary text-lg rounded-full py-2 px-5 w-max delay-75 duration-100 hover:border-primaryHover hover:text-primaryHover hover:scale-105 sm:py-4 sm:px-8 lg:py-3 lg:px-5" href="#">Contact us</Link>
            </div>
            <div className="w-full h-auto text-gray-400  lg:flex lg:justify-end">
                <Image className="w-full rounded-lg lg:w-72" src="/phone-call.svg" alt="phone call" width={200} height={300} />
            </div>
        </div>
    )
}
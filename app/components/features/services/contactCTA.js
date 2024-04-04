import Image from "next/image";
import Link from "next/link";

export default function ContactCTA() {
    return (
        <div className="px-20 py-10 flex justify-between items-center w-full bg-secondary text-white">
            <div className="flex flex-col gap-4">
                <h3 className="text-4xl font-extrabold w-[18ch]">
                    Do you need a more customized solution?
                </h3>
                <p className="w-[40ch] text-gray-300">
                    We understand that businesses are different and you may need a more personalized solution. 
                    Let&apos;s work with you to curate the ideal solution for your current and future needs.
                </p>
                <Link className="border border-white rounded-full py-1 px-5 w-max" href="#">Contact us</Link>
            </div>
            <div className="w-auto h-auto">
                <Image className="w-72 rounded-lg" src="/phone-call.svg" alt="" width={200} height={300} />
            </div>
        </div>
    )
}
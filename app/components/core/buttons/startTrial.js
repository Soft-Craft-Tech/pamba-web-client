import Link from "next/link";
import Image from "next/image";

export default function StartTrial() {
    return (
        <Link href="/signup" className="bg-primary flex items-center w-max py-2 px-4 text-white font-medium rounded-full gap-2">
            Start Free Trial
            <Image className="border bg-white rounded-full" src="/arrow-right.svg" alt="arrow-icon" width={20} height={20} />
        </Link>
    )
}
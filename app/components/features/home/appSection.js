import Link from "next/link";
import Image from "next/image";

export default function AppSection() {
    return (
        <section className="grid grid-cols-2 grid-rows-1 bg-secondary text-white p-20 gap-20 w-full h-auto">
            <div className="flex flex-col justify-center gap-5">
                <h3 className="font-extrabold text-3xl">Your clients are using the Pamba application to book with you.</h3>
                <p className="text-base font-light text-gray-300">
                    Our Pamba app seamlessly manages the client side of your business, leaving you free to focus on what you do best: 
                    providing exceptional service. Let us handle customer scheduling effortlessly, while you elevate your business. 
                    Spread the word about the Pamba app to your clients and transition them to the online platform - all at no cost to you.
                </p>
                <div className="flex gap-5">
                    <Link href="">
                        <Image className="w-24" src="/app-store-badge.svg" alt="pamba app" width={50} height={20} />
                    </Link>
                    <Link href="">
                        <Image className="w-24" src="/play-store-badge.svg" alt="pamba app" width={50} height={20} />
                    </Link>
                </div>
            </div>
            <div className="w-full flex justify-end">
                <Image className="w-auto" src="/pamba-mobile-app.svg" alt="Pamba mobile app" width={200} height={300} />
            </div>
        </section>
    )
}
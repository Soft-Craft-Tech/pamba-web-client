import Image from "next/image";

export default function AboutHero() {
    return (
        <div className="w-full h-screen relative text-white">
            <Image className="object-cover w-full h-full -z-10" src="/about-hero-bg.svg" alt="" fill={true} />
            <div className="w-full absolute -z-10 h-full bg-black top-0 left-0 opacity-60"></div>
            <div className="flex flex-col w-full items-center h-full justify-center z-20 gap-1">
                <h2 className="font-extrabold text-6xl">About Us</h2>
                <p className="w-[50ch] text-center text-lg">
                Our cutting-edge platform offers a seamless and intuitive solution for businesses and individuals to schedule appointments effortlessly.
                </p>
            </div>
        </div>
    )
}
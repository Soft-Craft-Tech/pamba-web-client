import Image from "next/image";

export default function AboutHero() {
    return (
        <div className="w-full h-screen relative text-white mt-20">
            <Image className="object-cover w-full h-full -z-10" src="/about-hero-bg.svg" alt="" fill={true} />
            <div className="w-full absolute -z-10 h-full bg-black top-0 left-0 opacity-80"></div>
            <div className="flex flex-col w-full items-center h-full justify-center z-20 gap-3 p-2 sm:px-10">
                <h2 className="font-extrabold text-5xl md:text-8xl lg:text-6xl">About <span className="text-primary">Pamba</span></h2>
                <p className="text-center text-lg text-gray-300 lg:w-[50ch] md:text-3xl lg:text-xl">
                    Our cutting-edge platform offers a seamless and intuitive solution for businesses and individuals to schedule appointments effortlessly.
                </p>
            </div>
        </div>
    )
}
import StartTrial from "../../core/buttons/startTrial";
import Image from "next/image";

export default function CTA() {
    return (
        <section className="w-full py-10 px-5 flex flex-col justify-center items-center gap-5 relative min-h-80 sm:px-10 lg:py-24 lg:px-20">
            <h2 className="font-bold text-3xl leading-tight text-secondary text-center">
                Ready to Simplify Your Business Management? <br />
                Join us Today 
            </h2>
            <StartTrial />
            <Image className="absolute left-0 top-1/2 transform -translate-y-1/2 h-72"  src="/rectangles-left.svg" alt="" width={200} height={250} />
            <Image className="absolute right-0 top-1/2 transform -translate-y-1/2 h-72" src="/rectangles-right.svg" alt="" width={200} height={250} />
        </section>
    )
}
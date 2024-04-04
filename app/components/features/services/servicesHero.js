import StartTrial from "../../core/buttons/startTrial";
import Image from "next/image";

export default function ServicesHero({title, text, image}) {
    return (
        <div className="w-full h-auto text-white">
            <div className="w-full h-96 bg-secondary px-20 py-16 flex flex-col items-center gap-4 relative">
                <h1 className="w-max font-extrabold text-3xl">
                   {title}
                </h1>
                <p className="w-[50ch] text-center text-gray-300">
                    {text} 
                </p>
                <StartTrial />
            </div>
            <div className="relative w-full h-96 pb-20">
                <Image className="w-1/2 h-96 rounded-md object-contain absolute -top-20 left-1/2 transform -translate-x-1/2" src={image} alt="pamba" width={300} height={250} />
            </div>
        </div>
    )
}
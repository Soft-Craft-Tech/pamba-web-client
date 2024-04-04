import Image from "next/image";

export default function ValuePrepositionCard({image, title, text}) {
    return (
        <div className="flex flex-col items-center w-80 h-auto gap-1">
            <Image className="w-10 h-10" src={image} alt="" width={20} height={20} />
            <h3 className="font-extrabold mt-2">{title}</h3>
            <p className="text-sm text-center text-muted">{text}</p>
        </div>
    )
}
import Image from "next/image"
export default function Category({img, text}) {
    return (
        <div className="w-28 h-28 flex flex-col gap-2 bg-white p-3 rounded-lg items-center justify-center">
            <Image className="w-10 h-10" src={img} alt="pamba-icons" width={24} height={24} />
            <h2 className="font-bold text-secondary text-sm text-center">{text}</h2>
        </div>
    )
}
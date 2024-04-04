import Image from "next/image";
import Link from "next/link";

export default function ServiceCard({bgWhite, img, title, text, url}) {
    return (
        <div className={`w-full h-auto ${bgWhite && "bg-white"} grid grid-cols-2 grid-rows-1 gap-16 py-16 px-20`}>
            <div className={`flex flex-col w-full h-full justify-center gap-5 ${!bgWhite && "order-2"}`}>
                <h3 className="text-3xl font-extrabold text-primary">{title}</h3>
                <p className="text-secondary font-light text-lg">{text}</p>
                <Link className="flex items-center w-max h-max gap-2 px-5 py-2 border border-primary rounded-full text-primary font-medium" href={url}>
                    Learn more
                    <Image src="/arrow-right-white.svg" alt="pamba-arrow" className="border bg-primary rounded-full p-1 w-5 h-5" width={20} height={20} />
                </Link>
            </div>
            <div className={`${!bgWhite && "order-1"}`} >
                <Image src={img} alt="pamba services" width={500} height={450} />
            </div>
        </div>
    )
}
import Image from "next/image";
import uniqid from "uniqid";

export default function ServiceInfoCard({reverse, image, title, text, functions}) {
    return (
        <div className="w-full h-auto grid grid-cols-2 grid-rows-1 gap-16">
            <div className={`h-96 shadow-md w-full p-5 bg-secondary rounded-md ${reverse && "order-2"}`}>
                <div className="relative w-full h-full">
                    <Image className="absolute rounded-md left-0 top-0 w-full h-full object-contain" src={image} alt="" width={150} height={100} />
                </div>
            </div>
            <div className={`flex flex-col gap-3 w-full h-full justify-center text-muted ${reverse && "order-1"}`}>
                <h3 className="font-extrabold text-3xl text-secondary">
                    {title}
                </h3>
                <p className="">{text}</p>
                <div className="text-secondary flex flex-col gap-2">
                    {functions.map(func => {
                        return <p key={uniqid()} className="w-full h-5 flex items-center gap-3 text-sm font-medium">
                            <Image className="w-5 h-5" src="/tick-icon.svg" alt="" width={10} height={10} />
                            {func}
                        </p>
                    })}
                </div>
            </div>
        </div>
    )
}
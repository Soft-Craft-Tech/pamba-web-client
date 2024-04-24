import Image from "next/image";
import Separator from "../../shared/sectionSeparators/separator";

export default function OurStats() {
    return (
        <section className="bg-white w-full py-10 px-5 flex flex-col gap-5 lg:px-20">
            <Separator
				btnText={"Our Impact"}
				header={"We are trusted by"}
			/>
            <div className="flex ">
                
                <div className='w-full flex flex-col items-center gap-2  border-r border-borders'>
                    <div className="w-10 h-10 rounded-sm bg-[#EFE5ED] flex justify-center items-center">
                        <Image className="w-6 h-7" src="/user-icons/users-icon.svg" alt="users-icon" width={30} height={24} />
                    </div>
                    <h2 className="text-3xl text-primary font-extrabold sm:text-5xl">
                        1000+
                    </h2>
                    <p className="text-primary">App users</p>
                </div>
                <div className='w-full flex flex-col items-center gap-3'>
                    <div className="w-10 h-10 rounded-sm bg-[#EFE5ED] flex justify-center items-center">
                        <Image className="w-6 h-7" src="/briefcase.svg" alt="briefcase-icon" width={30} height={24} />
                    </div>
                    <h2 className="text-3xl text-primary font-extrabold sm:text-5xl">
                        300+
                    </h2>
                    <p className="text-primary">Businesses</p>
                </div>
            </div>
        </section>
    )
}
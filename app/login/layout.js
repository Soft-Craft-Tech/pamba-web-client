import Image from "next/image";
export const metadata = {
    title: "Login - Pamba App",
    description: "Simplify Your Operations With Effortless Business Management",
};

export default function LoginLayout({children}) {
    return (
        <main className="w-full h-screen overflow-hidden flex justify-center items-center bg-background">
            <div className="w-2/3 h-5/6 grid grid-cols-2 grid-rows-1 border rounded-xl overflow-hidden gap-5 bg-white">
                <div className="relative w-full h-full">
                    <Image className="object-cover" src="/login-img.svg" alt="pamba login" fill={true} />
                </div>
                <div className="p-10 text-secondary flex flex-col gap-5 items-center justify-center">
                    <div className="flex flex-col items-center w-full h-auto">
                        <Image className="w-36 h-auto" src="/logo.svg" alt="pamba logo" width={40} height={20} />
                        <h3 className="font-medium w-max">Welcome back</h3>
                    </div>
                    {children}
                </div>
            </div>
        </main>
    )
}
import Image from "next/image";
import Link from "next/link";
import { AuthContextWrapper } from "../context/auth/authContext";
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
                <div className="p-10 text-secondary flex flex-col gap-4 items-center justify-center">
                    <div className="flex flex-col items-center w-full h-auto">
                        <Link href="/">
                            <Image className="w-36 h-auto" src="/logo.svg" alt="pamba logo" width={40} height={20} />
                        </Link>
                        <h3 className="font-medium w-max">Welcome back</h3>
                    </div>
                    <AuthContextWrapper>
                        {children}
                    </AuthContextWrapper>
                    <div className="flex w-full h-6 gap-2 items-center justify-center">
                        <p className="text-muted text-sm">Don &apos; t have an account? </p>
                        <Link className="text-secondary font-bold text-sm" href="/signup">Signup</Link>
                    </div>
                    {/* <div className="w-full h-auto flex flex-col gap-5">
                        <div className="flex w-full h-5 gap-3  items-center">
                            <div className="w-full h-[0.5px] bg-gray-400"></div>
                            <h3 className="text-center text-gray-400 w-max">or</h3>
                            <div className="w-full h-[0.5px] bg-gray-400"></div>
                        </div>
                        <GoogleAuthBTN />
                    </div> */}
                </div>
            </div>
        </main>
    )
}
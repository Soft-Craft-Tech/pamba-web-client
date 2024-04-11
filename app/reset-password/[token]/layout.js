import Image from "next/image";
import Link from "next/link";
import { AuthContextWrapper } from "@/app/context/auth/authContext";

export const metadata = {
    title: "Reset Password - Pamba App",
    description: "Simplify Your Operations With Effortless Business Management",
};

export default function PasswordReset({children}) {
    return (
        <main className="w-screen h-screen overflow-hidden relative flex justify-center items-center">
            <Image className="absolute object-cover top-0 left-0 -z-20" src="/passwordResetBg.svg" alt="" fill={true} />
            <div className="w-full h-full absolute left-0 top-0 bg-black opacity-30 -z-10"></div>
            <div className="h-80 w-80 rounded-lg bg-white px-5 py-10 flex flex-col gap-8 z-10 shadow-lg">
                <div className="flex flex-col items-center gap-1 w-full h-auto">
                    <Link href="/">
                        <Image className="w-36 h-auto" src="/logo.svg" alt="pamba logo" width={40} height={20} />
                    </Link>
                    <h3 className="font-semibold text-secondary text-sm">Create New Password</h3>
                    <p className="text-muted text-xs font-light text-center">Set a new password to keep your pamba account secure</p>
                </div>
                <AuthContextWrapper>
                    {children}
                </AuthContextWrapper>
            </div>
        </main>
    )
}
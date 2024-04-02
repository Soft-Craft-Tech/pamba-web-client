import Link from "next/link";
import Image from "next/image";
import { AuthContextWrapper } from "../context/auth/authContext";

export default function SignupLayout({children}) {
    return (
        <main className="flex min-h-screen bg-white">
            <div className="hidden lg:block lg:w-1/2 overflow-hidden">
                <div className="fixed">
                    <Image src="/signup-img.svg" alt="" width={500} height={400} className="object-cover w-full h-full" />
                </div>
            </div>
            <div className="w-full lg:w-1/2 overflow-auto p-8">
                <div className="max-w-md mx-auto">
                    <div className="flex flex-col items-center w-full h-auto">
                        <Link href="/">
                            <Image className="w-36 h-auto" src="/logo.svg" alt="pamba logo" width={40} height={20} />
                        </Link>
                    </div>
                    <AuthContextWrapper>
                        {children}
                    </AuthContextWrapper>
                    <div className="flex w-full h-6 gap-2 items-center justify-center">
                        <p className="text-muted text-sm">Already have an account? </p>
                        <Link className="text-secondary font-bold text-sm" href="/login">Login</Link>
                    </div>
                </div>
            </div>
        </main>
    )
}
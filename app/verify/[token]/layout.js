import { AuthContextWrapper } from "@/app/context/auth/authContext";
export default function VerifyAccount({children}) {
    return (
        <main className="w-screen h-screen bg-background flex justify-center items-center">
            <AuthContextWrapper>
                {children}
            </AuthContextWrapper>
        </main>
    )
}
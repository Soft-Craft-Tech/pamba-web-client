import { CompleteProfileWrapper } from "../../context/completeProfile/completeProfileContext"
export default function CompleteProfileLayout({children}) {
    return (
        <main className="flex w-full min-h-screen bg-background">
            <CompleteProfileWrapper>
                {children}
            </CompleteProfileWrapper>
        </main>
    )
}
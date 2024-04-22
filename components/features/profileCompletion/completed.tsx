import { AiOutlineCheckCircle } from 'react-icons/ai';
import Link from "next/link";
export default function ProfileComplete() {
    return (
        <div className="w-screen h-screen bg-background flex items-center justify-center">
            <div className="w-96 h-80 bg-white rounded-sm shadow-sm p-5 flex flex-col gap-5 justify-center items-center">
                <AiOutlineCheckCircle className="w-20 h-20 text-green-500" />
                <p className="text-muted text-sm font-bold">You profile is now 100% complete</p>
                <Link className="bg-primary text-white rounded-full py-2 px-5" href="/">Go to Dashboard</Link>
            </div>
        </div>
    )
}
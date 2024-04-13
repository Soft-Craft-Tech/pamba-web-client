import Link from "next/link";
import HelpSupportForm from "./helpSupportForm";
export default function HelpSupport() {
    return (
        <div className="flex flex-col gap-5">
            <div className="">
                <h2 className="font-semibold text-lg">We value your Feedback</h2>
                <p className="text-sm text-gray-600">Help us serve you better. Tell us of any problems you encounter on Pamba</p>
            </div>
            <HelpSupportForm />
            <div className="flex flex-col gap-1 text-sm font-semibold text-[#007B99]">
                <Link href="/privacy-policy">Terms and Condition</Link>
                <Link href="/privacy-policy">Privacy Policy</Link>
            </div>
        </div>
    )
}
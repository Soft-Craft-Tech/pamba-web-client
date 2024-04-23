import RequestDeletionForm from "../components/forms/requestDeletionForm";
import Image from "next/image";
import Link from "next/link";

export default function RequestDeletion() {
    return (
        <div className="w-full h-screen overflow-hidden flex flex-col gap-10 justify-center items-center lg:p-20 lg:gap-5">
            <Link href="/">
                <Image
                    className="w-36 h-auto"
                    src="/logo.svg"
                    alt="pamba logo"
                    width={40}
                    height={20}
                    priority
                />
            </Link>
            <div className="w-11/12 h-auto border flex flex-col gap-5 px-5 py-10 rounded-md lg:w-1/2">
                <div className="flex flex-col gap-1">
                    <h1 className="font-extrabold text-xl text-primary">Request Account Deletion</h1>
                    <p className="text-base text-secondary">We are sorry to see you leave Pamba 😔</p>
                </div>
                <RequestDeletionForm />
                <p className="text-xs font-light text-primary">* Your personal Data will be permanently deleted 30days after submission of this request.</p>
            </div>
        </div>
    )
}
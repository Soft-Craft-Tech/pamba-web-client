import Image from "next/image";
import { AiFillEdit } from "react-icons/ai";
import ProfileUpdateForm from "./updateForm";
export default function EditProfile() {
    return (
        <div className="flex gap-10">
            <div className="flex flex-col gap-3">
                <div className="w-32 h-32 border rounded-full relative overflow-hidden">
                    <Image className="top-0 left-0 object-cover" src="/user-icons/profile-icon.svg" alt="" fill={true} />
                </div>
                <button className="text-sm text-blue-400 w-auto h-auto flex items-center gap-2">
                    <AiFillEdit size={20} />
                    Change Image
                </button>
            </div>
            <ProfileUpdateForm />
        </div>
    )
}
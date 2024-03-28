"use client";
import { useState } from "react";
import Image from "next/image";

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <form className="flex flex-col gap-3">
            <input className="w-full h-10 rounded-md border border-borders px-2 py-1" type="email" required name="email" placeholder="Email" />
            <div className="w-full h-10 rounded-md border border-borders relative">
                <div className="absolute flex items-center  h-full w-max right-0 px-2 hover:text-gray-300">
                    {!showPassword ? <Image onClick={() => {setShowPassword(prev => !prev)}} className="w-[20px] cursor-pointer" src="/eye-open.png" alt="hide password" width={24} height={24} /> :
                    <Image onClick={() => {setShowPassword(prev => !prev)}} className="w-[20px] cursor-pointer" src="/eye-closed.png" alt="show password" width={24} height={24} />}
                </div>
                <input className="h-full w-full px-2 py-1"  type={showPassword ? "text": "password"} required name="password" placeholder="Password" />
            </div>
            <button className="text-white bg-primary rounded-md py-2 font-semibold" type="submit">Login</button>
        </form>
    )
}
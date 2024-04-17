"use client";
import Image from "next/image";
import { useState } from "react";

export default function GoogleAuthBTN() {
    const [btnState, setBtnState] = useState(true)
    return (
        <button onClick={() => {setBtnState(prev => !prev)}} className="w-full h-10 flex justify-center items-center gap-5 border rounded-md">
            {
                btnState ? <><Image src="/google.svg" alt="Google Icon" width={20} height={20} />
                Continue with Google </> : <>This feature is not available yet.</>
            }
        </button>
    )
}
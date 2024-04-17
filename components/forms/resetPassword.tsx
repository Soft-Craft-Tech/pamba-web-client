"use client";
import { useMutation } from "@tanstack/react-query";
import { useRef, useContext } from "react";
import Toast from "../shared/toasts/authToast";
import { AuthPageContext } from "@/app/context/auth/authContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function PasswordResetForm({token}) {
    const {setShowToast, showPassword, setShowPassword} = useContext(AuthPageContext);
    const passwordRef = useRef();
    const router = useRouter();

    // Mutate data
    const {mutate, error, isPending, data, isSuccess} = useMutation({
        mutationFn: async () => {
            const { data } = await axios.put(
                `${process.env.NEXT_PUBLIC_BASE_URL}/API/businesses/reset-password/${token}`,
                {
                    password: passwordRef.current.value
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY,
                    }
                }
            );
            return data;
        }
    });

    // Handle submit
    const handleSubmit = (e) => {
        e.preventDefault();
        mutate();
        setShowToast(true);
    }

    if (isSuccess) {
        setTimeout(() => {router.push("/login")}, 3000);
    }

    return (
        <>
            {error && <Toast message={[401, 400, 403, 404, 409].includes(error?.response?.status) ? error?.response?.data?.message : "Something went wrong"} type="error" />}
            {isSuccess && <Toast message={data?.message} type="success" />}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="w-full h-10 rounded-md border border-borders relative">
                    <div className="absolute flex items-center  h-full w-max right-0 px-2 hover:text-gray-300">
                        {!showPassword ? <Image onClick={() => {setShowPassword(prev => !prev)}} className="w-[20px] cursor-pointer" src="/eye-open.png" alt="hide password" width={24} height={24} /> :
                        <Image onClick={() => {setShowPassword(prev => !prev)}} className="w-[20px] cursor-pointer" src="/eye-closed.png" alt="show password" width={24} height={24} />}
                    </div>
                    <input ref={passwordRef} className="h-full w-full px-2 py-1"  type={showPassword ? "text": "password"} required name="password" placeholder="Password" />
                </div>
                <button disabled={isPending} className="bg-primary text-white w-full h-10 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">{isPending ? "Loading..." : "Submit"}</button>
            </form>
        </>
    )
}
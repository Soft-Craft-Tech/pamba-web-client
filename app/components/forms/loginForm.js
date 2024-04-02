"use client";
import { useRef, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { AuthPageContext } from "@/app/context/auth/authContext";
import Toast from "../shared/toasts/authToast";
import axios from "axios";
import Cookies from "universal-cookie";


export default function LoginForm() {
    const {showPassword, setShowPassword, setShowToast} = useContext(AuthPageContext);
    const emailRef = useRef();
    const passwordRef = useRef();
    const cookies = new Cookies();

    const {mutate, error, isPending, data, isSuccess} = useMutation({
        mutationFn: async () => {
            const { data } = await axios.post(
                "https://pamba-web.onrender.com/API/businesses/login",
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                        "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY,
                    },
                    auth: {
                        username: emailRef.current.value,
                        password: passwordRef.current.value
                    }
                }
            );
            return data;
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutate();
        setShowToast(true);
        
        // Redirect to dashboard
    }

    if (isSuccess) {
        cookies.set("token", data?.authToken, {path: "/", sameSite: "None", secure:true});
        cookies.set("username", data?.client?.slug, {path: "/", sameSite: "None", secure:true});
    }
    
    return (
        <div className="relative">
            {error && <Toast message={[401, 400, 403, 404, 409].includes(error?.response?.status) ? error?.response?.data?.message : "Something went wrong"} type="error" />}
            {isSuccess && <Toast message={data?.message} type="success" />}
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input ref={emailRef} className="w-full h-10 rounded-md border border-borders px-2 py-1" type="email" required name="email" placeholder="Email" />
                <div className="w-full h-10 rounded-md border border-borders relative">
                    <div className="absolute flex items-center  h-full w-max right-0 px-2 hover:text-gray-300">
                        {!showPassword ? <Image onClick={() => {setShowPassword(prev => !prev)}} className="w-[20px] cursor-pointer" src="/eye-open.png" alt="hide password" width={24} height={24} /> :
                        <Image onClick={() => {setShowPassword(prev => !prev)}} className="w-[20px] cursor-pointer" src="/eye-closed.png" alt="show password" width={24} height={24} />}
                    </div>
                    <input ref={passwordRef} className="h-full w-full px-2 py-1"  type={showPassword ? "text": "password"} required name="password" placeholder="Password" />
                </div>
                <div className="flex justify-end">
                    <Link href="/request-password-reset" className="text-xs font-bold text-cyan-600">Forgot Password?</Link>
                </div>
                <button disabled={isPending} className="text-white bg-primary rounded-md py-2 font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" type="submit">{isPending ? "Loading..." : "Login"}</button>
            </form>
        </div>
        
    )
}
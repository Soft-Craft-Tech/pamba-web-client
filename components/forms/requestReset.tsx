"use client";
import { useMutation } from "@tanstack/react-query";
import { useRef, useContext } from "react";
import Toast from "../shared/toasts/authToast";
import { AuthPageContext } from "@/app/context/auth/authContext";
import axios from "axios";

export default function RequestResetForm() {
    const {setShowToast} = useContext(AuthPageContext);
    const emailRef = useRef();

    // Mutate data
    const {mutate, error, isPending, data, isSuccess} = useMutation({
        mutationFn: async () => {
            const { data } = await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/API/businesses/request-password-reset`,
                {
                    email: emailRef.current.value
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

    // Submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        mutate();
        setShowToast(true);
    }

    return (
        <>
            {error && <Toast message={[401, 400, 403, 404, 409].includes(error?.response?.status) ? error?.response?.data?.message : "Something went wrong"} type="error" />}
            {isSuccess && <Toast message={data?.message} type="success" />}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input ref={emailRef} type="email" required name="email" placeholder="Email" className="w-full h-10 border rounded-md py-1 px-2" />
                <button disabled={isPending} className="bg-primary text-white w-full h-10 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">Submit</button>
            </form>
        </>
    )
}
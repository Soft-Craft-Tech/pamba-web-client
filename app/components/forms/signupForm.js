"use client";
import useMultipleStepForm from "@/app/hooks/useMultiStepForm";
import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import Toast from "../shared/toasts/authToast";
import { AuthPageContext } from "@/app/context/auth/authContext";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SignupForm() {
    const {formData, setFormData, termsAccepted, setTermsAccepted, showPassword, setShowPassword, setShowToast} = useContext(AuthPageContext);
    const router = useRouter()

    // Handle Terms and conditions check box
    const acceptTerms = () => {
        setTermsAccepted(prev => !prev);
    }

    // Handle input changes
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => {
            return {...prev, [name]: value}
        });
    }

    // Signup Form steps
    const {next, back, step, isFirst, isLast} = useMultipleStepForm(
        [
            <>
                <input value={formData.email} onChange={handleInputChange}  className="border w-full h-14 py-1 px-2  lg:h-12" type="email" name="email" required placeholder="Email" />
                <div className="border w-full h-14 flex relative  lg:h-12">
                    <div className="absolute flex items-center  h-full w-max right-0 px-2 hover:text-gray-300">
                        {!showPassword ? <Image onClick={() => {setShowPassword(prev => !prev)}} className="w-[20px] cursor-pointer" src="/eye-open.png" alt="hide password" width={24} height={24} /> :
                        <Image onClick={() => {setShowPassword(prev => !prev)}} className="w-[20px] cursor-pointer" src="/eye-closed.png" alt="show password" width={24} height={24} />}
                    </div>
                    <input value={formData.password} onChange={handleInputChange}  className="h-full w-full  py-1 px-2" type={showPassword ? "text": "password"} name="password" required placeholder="Password" />
                </div>
                <div className="flex gap-4 w-full h-10 items-center">
                    <input checked={termsAccepted} onChange={acceptTerms}  className="w-6 h-6 form-checkbox" type="checkbox" name="acceptedTerms" required />
                    <span className="text-sm">
                        Accept
                        <Link className="text-blue-500" href="#"> Terms and Conditions </Link>
                        and 
                        <Link className="text-blue-500" href="#"> Privacy Policy</Link>
                    </span>
                </div>
            </>,
            <>
                <input value={formData.name} onChange={handleInputChange}  className="border w-full h-14 py-1 px-2 lg:h-12" type="text" name="name" required placeholder="Business Name" />
                <select value={formData.category} onChange={handleInputChange} className="text-gray-400 border w-full h-14 py-1 px-2  lg:h-12" name="category" required>
                    <option value="">Business Category</option>
                    <option value="Salon">Salon</option>
                    <option value="SPA">Spa</option>
                    <option value="Barbershop">Barbershop</option>
                </select>
                <input value={formData.phone} onChange={handleInputChange} className="border w-full h-14 py-1 px-2  lg:h-12" type="text" name="phone" required placeholder="Phone Number" />
                <input value={formData.city} onChange={handleInputChange} className="border w-full h-14 py-1 px-2  lg:h-12" type="text" name="city" required placeholder="City" />
                <input value={formData.mapUrl} onChange={handleInputChange} className="border w-full h-14 py-1 px-2  lg:h-12" type="url" name="mapUrl" required placeholder="Map URL" />
                <textarea value={formData.location} onChange={handleInputChange} className="border w-full h-14 py-1 px-2 resize-none rows-2  lg:h-12"name="location" required placeholder="Describe location" />
            </>
        ]
    );
    const { mutate, error, isPending, data, isSuccess } = useMutation({
        mutationFn: async () => {
            const { data } = await axios.post(
                "https://pamba-web.onrender.com/API/businesses/signup",
                formData,
                {
                    headers: {
                    "Content-Type": "application/json",
                    "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY,
                    },
                }
            );
            return data;
        }
    });

    // Handle Signup Form Submit.
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isLast) {
            next();
        } else {
            mutate();
            setShowToast(true);
        }
    }

    // Redirect upon successful sign up.
    if (isSuccess) {
        setTimeout(() => {router.push("/login")}, 2000);
    }

    return (
        <div className="w-full flex flex-col items-center gap-8 lg:gap-5 ">
            {error && <Toast message={[401, 400, 403, 404, 409].includes(error?.response?.status) ? error?.response?.data?.message : "Something went wrong"} type="error" />}
            {isSuccess && <Toast message={data?.message} type="success" />}
            <h3 className="font-medium w-full text-lg text-center">{isFirst ? <>Create Account</> : <>Business Information</>}</h3>
            <div className="flex gap-2 w-32 h-3 justify-center items-center text-blue-500 font-semibold">
                <p>1</p>
                <div className="w-24 h-[3px] bg-blue-200 flex justify-start items-center text-center">
                    <div className={`h-[3px] bg-blue-600 ${isLast ? 'w-full' : 'w-1/2'}`}></div>
                </div>
                <p>2</p>
            </div>
            <form onSubmit={handleSubmit} className="p-3 w-full flex flex-col gap-4">
                <div className="flex flex-col gap-5 lg:gap-4">
                    {step}
                </div>
                <div className="flex h-auto w-full">
                   {!isFirst && <div onClick={back} className="h-full w-full flex items-center py-2 text-primary gap-1 cursor-pointer">
                        <Image src="/arrow-left.svg" alt="" width={20} height={20} />
                        <h2 className="text-sm font-semibold">Back</h2>
                    </div>}
                    <button disabled={isPending} type="submit" className="bg-primary w-full h-full py-4 rounded-md text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                        {!isLast ? "Continue" : isPending ? "Submitting" : "Submit"}
                    </button>
                </div>
            </form>
        </div>
    )
}
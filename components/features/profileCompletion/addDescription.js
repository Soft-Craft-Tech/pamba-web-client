"use client";
import ProfileProgress from "../../core/cards/progress";
import { CompleteProfileContext } from "@/app/context/completeProfile/completeProfileContext";
import { useContext, useState } from "react";
import Toast from "../../shared/toasts/genToast";
import { usePutRequest } from "@/app/hooks/useRequests";
import TextField from '@mui/material/TextField';

export default function BusinessDescription() {
    const {setStep} = useContext(CompleteProfileContext);
    const [businessDescription, setBusinessDescription] = useState({description: ""});
    
    const handleNext = () => {
        setStep(prev => prev+1);
    }

    // Mutate Data
    const {mutate, error, isPending, data, isSuccess} = usePutRequest(
        `${process.env.NEXT_PUBLIC_BASE_URL}/API/businesses/update-description`,
        businessDescription,
        true,
        handleNext
    );

    const handleChange = (e) => {
        const {name, value} = e.target;
        setBusinessDescription({[name]: value});
    }

    const submitDescription = () => {
        if (businessDescription.description) {
            mutate();
        }
    }
    return (
        <div className="w-full h-auto flex flex-col gap-5 px-5 py-10 sm:px-10 lg:px-20 overflow-x-hidden">
            {error && <Toast message={[401, 400, 403, 404, 409].includes(error?.response?.status) ? error?.response?.data?.message : "Something went wrong"} type="error" />}
            <ProfileProgress />
            <div className="flex flex-col gap-5 w-full max-h-96 p-10 border bg-white lg:w-96">
                <h3>Tell us about your Business</h3>
                <form className="flex flex-col gap-3">
                    <TextField
                        required
                        id="outlined-required"
                        label="Business Description"
                        type="text"
                        name="description"
                        value={businessDescription.description}
                        onChange={handleChange}
                        multiline
                        rows={3}
                    />
                </form>
            </div>
            <div className="w-full h-10 flex justify-end">
                <button disabled={isPending || !businessDescription.description} type="button" onClick={submitDescription} className="w-max px-7 py-2 rounded-full bg-primary text-white disabled:opacity-50 disabled:cursor-not-allowed">{isPending ? <>Loading</> : <>Next</>}</button>
            </div>
        </div>
    )
}
"use client";
import ProfileProgress from "../../core/cards/progress";
import { CompleteProfileContext } from "@/app/context/completeProfile/completeProfileContext";
import { useContext } from "react";
import { AiOutlineClose } from "react-icons/ai";
import uniqid from "uniqid";
import AddServicesForm from "../../forms/addServicesForm";
import Toast from "../../shared/toasts/genToast";
import { useGetRequest, usePostRequest } from "@/app/hooks/useRequests";


export default function AddServices() {
    const {setStep, queuedServices, setQueuedServices} = useContext(CompleteProfileContext);

    // Load Services
    const {data, error} = useGetRequest(`${process.env.NEXT_PUBLIC_BASE_URL}/API/services/fetch_all`);

    // Next Step
    const handleNext = () => {
        setStep(prev => prev+1);
    }

    //  Post Queued Service
    const {postFn, requestError, requestPending} = usePostRequest(
        `${process.env.NEXT_PUBLIC_BASE_URL}/API/businesses/assign-services`,
        {services: queuedServices},
        true,
        handleNext
    );

    // Remove Service
    const removeService = (itemIndex) => {
        return setQueuedServices(prev => {return prev.filter((_, index) => index !== itemIndex)});
    }

    // Submit Services
    const handleSubmitServices = () => {
        if(queuedServices.length !== 0) {
            postFn();
        }
    }

    return (
        <div className="w-full h-auto flex flex-col gap-5 px-5 py-10 sm:px-10 lg:px-20 ">
            {requestError && <Toast message={[401, 400, 403, 404, 409].includes(requestError?.response?.status) ? requestError?.response?.data?.message : "Something went wrong"} type="error" />}
            <ProfileProgress />
            <div className="flex gap-10 w-full flex-col md:flex-row">
                <AddServicesForm data={data} />
                {queuedServices.length > 0 && <div className="w-full h-full p-4 bg-white flex gap-3 flex-wrap lg:p-7">
                    {
                        queuedServices.map((service, index) => {
                        {return <div  key={uniqid()} className="rounded-md bg-secondary px-4 py-2 text-white w-max h-auto flex flex-col gap-1">
                                <div className="flex gap-3 items-center font-semibold">
                                    {/* Display services */}
                                    {data.services.filter(item => {return item.id === service.id})[0].service}
                                    <AiOutlineClose onClick={() => {removeService(index)}} size={20} className="cursor-pointer hover:text-primary" />
                                </div>
                                <p className="text-xs text-gray-400 font-light">{service.price} /-</p>
                            </div>
                        }})
                    }
                </div>}
            </div>
            <div className="w-full h-10 flex justify-end">
                <button disabled={requestPending || queuedServices.length === 0} type="button" onClick={handleSubmitServices} className="w-max px-7 py-2 rounded-full bg-primary text-white disabled:opacity-50 disabled:cursor-not-allowed">{requestPending ? <>Loading</> : <>Next</>}</button>
            </div>
        </div>
    )
}
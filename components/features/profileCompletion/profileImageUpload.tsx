"use client";
import ProfileProgress from "../../core/cards/progress";
import { CompleteProfileContext } from "@/app/context/completeProfile/completeProfileContext";
import { useContext, useState } from "react";
import { CldUploadWidget} from 'next-cloudinary';
import Toast from "../../shared/toasts/genToast";
import { usePutRequest } from "@/app/hooks/useRequests";

export default function UploadProfileImg() {
    const {setStep} = useContext(CompleteProfileContext);
    const [imgUrl, setImgUrl] = useState();
    
    const handleNext = () => {
        setStep(prev => prev+1);
    }

    // Mutate Data
    const {mutate, error, isPending, data, isSuccess} = usePutRequest(
        "${process.env.NEXT_PUBLIC_BASE_URL}/API/businesses/upload-profile-img",
        {imageURL: imgUrl},
        true,
        handleNext
    );

    const submitImg = () => {
        if (imgUrl) {
            mutate();
        }
    }

    return (
        <div className="w-full h-auto flex flex-col gap-5 px-5 py-10 sm:px-10 lg:px-20 ">
            {isSuccess && <Toast message={data?.message} type="success" />}
            {error && <Toast message={[401, 400, 403, 404, 409].includes(error?.response?.status) ? error?.response?.data?.message : "Something went wrong"} type="error" />}
            <ProfileProgress />
            <div className="w-full">
                <CldUploadWidget
                    onSuccess={results => {setImgUrl(results.info.secure_url)}}
                    options={{
                        sources: ['local', 'url', 'google_drive', 'dropbox'],
                        multiple: false
                    }}
                    uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET}>
                    {({ open }) => {
                    return (
                        <button className={`font-light text-lg px-5 py-2 rounded-md bg-white w-full h-40 border border-dashed ${imgUrl ? 'text-green-500 border-green-500' : 'text-primary border-primary'}`} onClick={() => open()}>
                        {imgUrl ? "Upload Successful" : "Upload your profile Image" }
                        </button>
                    );
                    }}
                </CldUploadWidget>
            </div>
            <div className="w-full h-10 flex justify-end">
                <button disabled={isPending || !imgUrl} onClick={submitImg} className="w-max px-7 py-2 rounded-full bg-primary text-white disabled:opacity-50 disabled:cursor-not-allowed">{isPending ? <>Loading</> : <>Next</>}</button>
            </div>
        </div>
    )
}
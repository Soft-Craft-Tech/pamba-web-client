import ProfileProgress from "../../core/cards/progress";
import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import Toast from "../../shared/toasts/genToast";
import { useChangeImageMutation } from "@/app/api/businesses";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { RootState } from "@/store/store";
import { setStep } from "@/store/completeProfileSlice";

export default function UploadProfileImg() {
  const [imgUrl, setImgUrl] = useState<any>("");
  const step = useAppSelector((state: RootState) => state.completeProfile.step);
  const dispatch = useAppDispatch();
  const { mutate, isLoading, isSuccess, error } = useChangeImageMutation();
  const submitImg = () => {
    if (imgUrl) {
      mutate(imgUrl);
    }
    dispatch(setStep(step + 1));
  };
  return (
    <div className="w-full h-auto flex flex-col gap-5 px-5 py-10 sm:px-10 lg:px-20 ">
      {isSuccess && <Toast message="Request Succesfull" type="success" />}
      {error && <Toast message={"Something went wrong"} type="error" />}
      <ProfileProgress />
      <div className="w-full">
        <CldUploadWidget
          onSuccess={(results: any) => {
            setImgUrl(results?.info?.secure_url);
          }}
          options={{
            sources: ["local", "url", "google_drive", "dropbox", "unsplash"],
            multiple: false,
            folder: "pamba-web",
          }}
          uploadPreset="pamba-africa-images"
        >
          {({ open }) => {
            return (
              <button
                className={`font-light text-lg px-5 py-2 rounded-md bg-white w-full h-40 border border-dashed ${
                  imgUrl
                    ? "text-green-500 border-green-500"
                    : "text-primary border-primary"
                }`}
                onClick={() => open()}
              >
                {imgUrl ? "Upload Successful" : "Upload your profile Image"}
              </button>
            );
          }}
        </CldUploadWidget>
      </div>
      <div className="w-full h-10 flex justify-end">
        <button
          disabled={isLoading || !imgUrl}
          onClick={submitImg}
          className="w-max px-7 py-2 rounded-full bg-primary text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? <>Loading</> : <>Next</>}
        </button>
      </div>
    </div>
  );
}

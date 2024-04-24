import ProfileProgress from "../../core/cards/progress";
import { useState } from "react";
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from "next-cloudinary";
import Toast from "../../shared/toasts/genToast";
import { useChangeImageMutation } from "@/app/api/requests";

export default function UploadProfileImg() {
  const [imgUrl, setImgUrl] = useState<any>("");

  const { mutate, isLoading, isSuccess, error } = useChangeImageMutation();

  const submitImg = () => {
    if (imgUrl) {
      mutate(imgUrl);
    }
  };

  return (
    <div className="w-full h-auto flex flex-col gap-5 px-5 py-10 sm:px-10 lg:px-20 ">
      {isSuccess && <Toast message="Request Succesfull" type="success" />}
      {error && <Toast message={"Something went wrong"} type="error" />}
      <ProfileProgress />
      <div className="w-full">
        <CldUploadWidget
          onSuccess={() => {
            setImgUrl("");
          }}
          options={{
            sources: ["local", "url", "google_drive", "dropbox"],
            multiple: false,
          }}
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET}
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

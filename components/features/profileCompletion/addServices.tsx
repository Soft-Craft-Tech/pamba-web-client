import { useSelector, useDispatch } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import AddServicesForm from "../../forms/addServicesForm";
import ProfileProgress from "@/components/core/cards/progress";
import { useAssignService, useGetServices } from "@/app/api/requests";
import { RootState } from "@/store/store";
import { setQueuedServices, setStep } from "@/store/completeProfileSlice";
import Toast from "@/components/shared/toasts/authToast";
import { useState } from "react";

export default function AddServices() {
  const dispatch = useDispatch();
  const {
    queuedServices,
    step: currentStep,
    toastMessage,
  } = useSelector((state: RootState) => ({
    queuedServices: state.completeProfile.queuedServices,
    step: state.completeProfile.step,
    toastMessage: state.toast.toastMessage,
  }));

  const { data } = useGetServices();

  const {
    mutate: assignServices,
    isLoading: postingServices,
    error: errorPosting,
  } = useAssignService();

  const handleNext = () => {
    dispatch(setStep(currentStep + 1));
  };

  const removeService = (itemIndex: number) => {
    dispatch(
      setQueuedServices(
        queuedServices.filter((_, index) => index !== itemIndex)
      )
    );
  };

  const handleSubmitServices = () => {
    if (queuedServices.length !== 0) {
      assignServices(queuedServices);
    }
    handleNext();
  };

  return (
    <div className="w-full h-auto flex flex-col gap-5 px-5 py-10 sm:px-10 lg:px-20 ">
      {errorPosting && <Toast message={toastMessage} type="error" />}
      <ProfileProgress />
      <div className="flex gap-10 w-full flex-col md:flex-row">
        <AddServicesForm data={data} />
        {queuedServices.length > 0 && (
          <div className="w-full h-full p-4 bg-white flex gap-3 flex-wrap lg:p-7">
            {queuedServices.map((service, index) => {
              return (
                <div
                  key={service.name} // Use UUID
                  className="rounded-md bg-secondary px-4 py-2 text-white w-max h-auto flex flex-col gap-1"
                >
                  <div className="flex gap-3 items-center font-semibold">
                    {service.name}
                    <AiOutlineClose
                      onClick={() => {
                        removeService(index);
                      }}
                      size={20}
                      className="cursor-pointer hover:text-primary"
                    />
                  </div>
                  <p className="text-xs text-gray-400 font-light">
                    {service.price} /-
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="w-full h-10 flex justify-end">
        <button
          disabled={postingServices || queuedServices.length === 0}
          type="button"
          onClick={handleSubmitServices}
          className="w-max px-7 py-2 rounded-full bg-primary text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {postingServices ? <>Loading</> : <>Next</>}
        </button>
      </div>
    </div>
  );
}

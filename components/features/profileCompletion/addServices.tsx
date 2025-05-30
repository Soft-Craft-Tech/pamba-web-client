"use client";
import { useAssignService } from "@/app/api/businesses";
import { useGetServiceCategories } from "@/app/api/services";
import ProfileProgress from "@/components/core/cards/progress";
import AddProfileServicesForm from "@/components/forms/addProfileServices";
import Toast from "@/components/shared/toasts/authToast";
import { ServiceType } from "@/components/types";
import { setQueuedServices, setStep } from "@/store/completeProfileSlice";
import { RootState } from "@/store/store";
import { usePathname } from "next/navigation";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

export default function AddServices() {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const {
    queuedServices,
    step: currentStep,
    toastMessage,
  } = useSelector((state: RootState) => ({
    queuedServices: state.completeProfile.queuedServices,
    step: state.completeProfile.step,
    toastMessage: state.toast.toastMessage,
  }));

  const { data } = useGetServiceCategories();
  const {
    mutate: assignServices,
    isPending: postingServices,
    error: errorPosting,
    isSuccess: successPosting,
  } = useAssignService();

  const handleNext = () => {
    dispatch(setStep(currentStep + 1));
  };

  const removeService = (itemIndex: number) => {
    dispatch(
      setQueuedServices(
        queuedServices.filter(
          (_: ServiceType, index: number) => index !== itemIndex
        )
      )
    );
  };

  const handleSubmitServices = () => {
    if (queuedServices.length !== 0) {
      const formattedServices = queuedServices.map((service) => ({
        ...service,
        price: Number(service.price),
      }));
      assignServices(formattedServices);
    }
    handleNext();
  };

  // if (successPosting) {
  //   // refetch();
  // }

  return (
    <div className="w-full h-auto flex flex-col gap-5 py-10">
      {successPosting && <Toast message={toastMessage} type="success" />}
      {errorPosting && <Toast message={toastMessage} type="error" />}
      {pathname !== "/user/services" && <ProfileProgress />}
      <div className="flex gap-10 w-full flex-col md:flex-row">
        <AddProfileServicesForm data={data} />
        {queuedServices.length > 0 && (
          <div className="w-full h-full p-4 bg-white flex gap-3 flex-wrap lg:p-7">
            {queuedServices.map((service: ServiceType, index: number) => {
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
          {postingServices
            ? "Loading"
            : pathname === "/user/services"
            ? "Save"
            : "Next"}
        </button>
      </div>
    </div>
  );
}

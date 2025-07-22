"use client";
import { useBookingCart } from "@/utils/providers/BookingCartProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import BackArrow from "@/components/shared/back";
import BookingCartSidebar from "@/components/singleService/BookingCartSidebar";
import { useGetSingleBusiness } from "@/app/api/businesses";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormField from "@/ui/FormField";
import { useBookAppointments } from "@/app/api/appointment";
import { formatDateForAPI } from "@/utils/formatTime";
import {
  saveClientFormData,
  loadClientFormData,
  clearAllBookingData,
} from "@/utils/formPersistence";

const bookingSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z
    .string()
    .min(7, "Phone number is required")
    .max(15, "Phone number is too long"),
  email: z.string().email("Invalid email address"),
  comment: z.string().optional(),
});

type BookingFormType = z.infer<typeof bookingSchema>;

const ClientInfoPage = () => {
  const { cartInfo, cartServices, clearCart } = useBookingCart();
  const router = useRouter();

  // Get business data from the first service in cartServices
  const { data: businessData } = useGetSingleBusiness(cartInfo?.business_slug || "");
  const { mutate: bookAppointment, isSuccess } = useBookAppointments();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<BookingFormType>({
    resolver: zodResolver(bookingSchema),
    mode: "onTouched",
  });

  // Load saved form data on mount
  useEffect(() => {
    const savedData = loadClientFormData();
    if (savedData) {
      reset(savedData);
    }
  }, [reset]);

  // Save form data as user types
  useEffect(() => {
    const subscription = watch((data) => {
      if (data.name || data.phone || data.email || data.comment) {
        saveClientFormData({
          name: data.name || "",
          phone: data.phone || "",
          email: data.email || "",
          comment: data.comment || "",
        });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  // Clear all data on successful submission
  useEffect(() => {
    if (isSuccess) {
      clearAllBookingData();
      clearCart();
      router.push("/booking/confirmation");
    }
  }, [isSuccess, clearCart, router]);

  const onSubmit = async (formData: BookingFormType) => {
    const data = {
      business: cartServices[0]?.business_id,
      comment: formData.comment === "" ? "N/A" : formData.comment,
      date: cartInfo.date ? formatDateForAPI(cartInfo.date) : undefined,
      email: formData.email,
      name: formData.name,
      notification: "SMS",
      phone: formData.phone,
      services: cartServices.map((item) => item.id),
      staff: cartInfo.provider_id,
      time: cartInfo.time,
    };

    bookAppointment(data);
  };

  if (cartServices.length === 0) {
    router.push("/confirmation");
    return null;
  }

  return (
    <div className="mx-auto max-w-screen-2xl px-4 w-full mt-5 relative">
      <BackArrow />

      <h2 className="text-2xl font-bold mb-2">Client Information</h2>
      <p className="text-gray-600 mb-4">
        Please provide your details to complete the booking
      </p>
      <div className="flex flex-col lg:flex-row gap-8 w-full mb-6">
        {/* Left: Client Information Form */}
        <div className="flex flex-col w-full h-auto gap-5">
          <div className="bg-white rounded-xl border p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex flex-col gap-4">
                <FormField
                  type="text"
                  placeholder="Client name"
                  name="name"
                  register={register}
                  error={errors.name}
                />
                <FormField
                  type="tel"
                  placeholder="Phone Number"
                  name="phone"
                  register={register}
                  error={errors.phone}
                />
                <FormField
                  type="email"
                  placeholder="Email"
                  name="email"
                  register={register}
                  error={errors.email}
                />
                <div className="flex flex-col gap-2">
                  <textarea
                    id="comment"
                    {...register("comment")}
                    placeholder="Additional information"
                    className={`w-full p-3 border rounded-md resize-none ${
                      errors.comment ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                    rows={4}
                  />
                  {errors.comment && (
                    <span className="text-red-500 text-sm">
                      {errors.comment.message}
                    </span>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Right: Booking Cart Sidebar */}
        <div className="w-full max-w-md">
          <BookingCartSidebar
            businessData={businessData}
            currentStep="client-info"
            onContinue={handleSubmit(onSubmit)}
            canContinue={true}
          />
        </div>
      </div>
    </div>
  );
};

export default ClientInfoPage;

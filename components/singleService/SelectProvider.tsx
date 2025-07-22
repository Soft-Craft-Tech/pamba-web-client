"use client";
import { useGetSingleBusiness } from "@/app/api/businesses";
import { useGetSingleService } from "@/app/api/services";
import BookingCartSidebar from "@/components/singleService/BookingCartSidebar";
import { useBookingCart } from "@/utils/providers/BookingCartProvider";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";

const SelectProvider = ({ businessSlug }: { businessSlug: string }) => {
  const { cartInfo, cartServices, updateCartProvider } = useBookingCart();
  console.log(cartServices);
  const router = useRouter();
  const [selectedProvider, setSelectedProvider] = useState<number | null>(null);

  const { data: businessData } = useGetSingleBusiness(businessSlug);
  const { data: serviceData } = useGetSingleService(
    cartServices[0]?.id.toString()
  );
  console.log(businessData);

  // Initialize selectedProvider from cartServices data
  useEffect(() => {
    if (cartInfo.provider_id !== undefined) {
      setSelectedProvider(cartInfo.provider_id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartServices]);

  const handleProviderSelect = (
    providerId: number | null,
    providerName?: string
  ) => {
    setSelectedProvider(providerId);
    updateCartProvider(providerId, providerName);
  };

  const handleContinue = () => {
    router.push(`/booking/select-datetime/${businessSlug}`);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Select Your Provider</h2>
      <p className="text-gray-600 mb-4">
        Choose the professional who will provide your services
      </p>
      <div className="flex flex-col lg:flex-row gap-8 w-full mb-6">
        {/* Left: Provider Selection */}
        <div className="flex flex-col w-full h-auto gap-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
              className={`bg-white rounded-xl border p-6 cursor-pointer transition-all duration-200 flex flex-col items-center gap-4 ${
                selectedProvider === null
                  ? "border-primary shadow-[0_0_0_2px_rgba(110,46,255,0.15)]"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => handleProviderSelect(null, "")}
            >
              <FaUsers className="text-primary text-4xl w-16 h-16" />
              <div>
                <h3 className="font-semibold text-center">Any Professional</h3>
                <p className="text-sm text-gray-600 text-center">
                  for maximum availability
                </p>
              </div>
            </div>
            {serviceData?.staff?.map(
              ({
                id,
                f_name,
                role,
              }: {
                id: number;
                f_name: string;
                role: string;
              }) => (
                <div
                  key={id}
                  className={`bg-white rounded-xl border p-6 cursor-pointer transition-all duration-200 ${
                    selectedProvider === id
                      ? "border-primary shadow-[0_0_0_2px_rgba(110,46,255,0.15)]"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => handleProviderSelect(id, f_name)}
                >
                  <div className="flex flex-col items-center gap-4 mb-4">
                    <Image
                      src="/blankImage.svg"
                      alt={f_name}
                      className="w-16 h-16 rounded-full object-cover"
                      width={64}
                      height={64}
                    />
                    <div>
                      <h3 className="font-semibold text-lg">{f_name}</h3>
                      <p className="text-sm text-gray-600">{role}</p>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* Right: Booking Cart Sidebar */}
        <div className="w-full max-w-md">
          <BookingCartSidebar
            businessData={businessData}
            currentStep="provider"
            onContinue={handleContinue}
            canContinue={true}
          />
        </div>
      </div>
    </div>
  );
};

export default SelectProvider;

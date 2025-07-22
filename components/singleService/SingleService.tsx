"use client";
import { useGetSingleBusiness } from "@/app/api/businesses";
import { useGetSingleService } from "@/app/api/services";
import ServiceCard from "@/components/ServiceCard";
import BookingCartSidebar from "@/components/singleService/BookingCartSidebar";
import { useBookingCart } from "@/utils/providers/BookingCartProvider";
import { useRouter } from "next/navigation";
import * as React from "react";
import { CartItem } from "../types";

const SingleService: React.FC<{ serviceId: string }> = ({ serviceId }) => {
  const {
    cartServices,
    addService,
    removeService,
  } = useBookingCart();
  const { data: businessData } = useGetSingleBusiness(serviceId);
  const { data: serviceData } = useGetSingleService(
    cartServices[0]?.id.toString()
  );

  const router = useRouter();
  
  const isInCart = (id: number) => cartServices.some((s) => s.id === id);

  const handleContinue = () => {
    // updateCartBusiness(businessData?.business?.id, businessData?.business?.business_name, serviceId);
    if (serviceData?.staff?.length > 0) {
      router.push(`/booking/select-provider/${serviceId}`);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Featured Services</h2>
      <div className="flex flex-col lg:flex-row gap-8 w-full mb-6">
        {/* Left: Service List */}
        <div className="flex flex-col w-full h-auto gap-5">
          <div className="flex flex-col gap-4">
            {businessData?.services?.map((serviceItem: CartItem) => (
              <ServiceCard
                key={serviceItem.id}
                service={serviceItem.service}
                description={serviceItem.description}
                href={"#"}
                price={serviceItem.price}
                duration={serviceItem.estimated_service_time}
                booking={true}
                businessData={businessData?.business}
                category={serviceItem.category_name}
                onAdd={() => addService(serviceItem)}
                onRemove={() => removeService(serviceItem.id)}
                selected={isInCart(serviceItem.id)}
              />
            ))}
          </div>
        </div>

        {/* Right: Booking Cart Sidebar */}
        <div className="w-full max-w-md">
          <BookingCartSidebar
            businessData={businessData}
            currentStep="services"
            onContinue={handleContinue}
            canContinue={cartServices.length > 0}
          />
        </div>
      </div>
    </div>
  );
};

export default SingleService;

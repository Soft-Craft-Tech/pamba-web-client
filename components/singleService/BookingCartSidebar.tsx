import { useBookingCart } from "@/utils/providers/BookingCartProvider";
import Image from "next/image";
import { FaCalendarAlt, FaClock, FaTrash } from "react-icons/fa";
import { formatDate, formatTimeRange, calculateEndTime } from "@/utils/formatTime";

interface BookingCartSidebarProps {
  businessData?: any;
  currentStep?: "services" | "provider" | "datetime" | "client-info";
  onContinue?: () => void;
  canContinue?: boolean;
}

const BookingCartSidebar = ({
  businessData,
  currentStep = "services",
  onContinue,
  canContinue = true,
}: BookingCartSidebarProps) => {
  const { cartServices, removeService, total } = useBookingCart();

  const getStepButtonText = () => {
    switch (currentStep) {
      case "services":
        return "Select Provider";
      case "provider":
        return "Select Date & Time";
      case "datetime":
        return "Enter Details";
      case "client-info":
        return "Confirm Booking";
      default:
        return "Continue";
    }
  };

  return (
    <aside className="w-full max-w-md bg-white rounded-xl border p-6 flex flex-col gap-4 shadow-md">
      {/* Business Info */}
      <div className="flex items-center gap-3 mb-2">
        {businessData?.business?.imageUrl && (
          <Image
            src={businessData.business.imageUrl}
            alt={businessData.business.business_name}
            width={64}
            height={48}
            className="rounded-lg h-16 w-16"
          />
        )}
        <div>
          <h2 className="font-bold text-lg">
            {businessData?.business?.business_name}
          </h2>
          <p className="text-xs text-gray-500">
            {businessData?.business?.formatted_address}
          </p>
        </div>
      </div>

      {cartServices[0]?.date && cartServices[0]?.time && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-primary text-xl" />
            <p className="text-xs text-gray-500">
              {formatDate(cartServices[0].date)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <FaClock className="text-primary text-xl" />
            <p className="text-xs text-gray-500">
              {formatTimeRange(
                cartServices[0].time, 
                calculateEndTime(cartServices[0].time, cartServices[0].estimated_service_time || 1)
              )}
            </p>
          </div>
        </div>
      )}

      {/* Cart Items */}
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold text-gray-900">Selected Services</h3>
        {cartServices.length === 0 ? (
          <p className="text-gray-400 text-sm">No services selected.</p>
        ) : (
          cartServices.map((service) => (
            <div
              key={service.id}
              className="flex justify-between items-center py-1"
            >
              <div>
                <div className="font-medium text-sm">{service.service}</div>
                <div className="text-xs text-gray-500">
                  {service.estimated_service_time} hrs
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm">
                  Ksh {service.price}
                </span>
                {currentStep === "services" && (
                  <button
                    onClick={() => removeService(service.id)}
                    className="text-red-500 hover:text-red-700 text-xs"
                  >
                    <FaTrash size={14} />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Total */}
      <div className="flex justify-between items-center mt-4 border-t pt-4">
        <span className="font-bold">Total</span>
        <span className="font-bold">Ksh {total}</span>
      </div>

      {/* Continue Button */}
      <button
        className="w-full bg-primary text-white py-3 rounded-full font-semibold mt-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
        disabled={cartServices.length === 0 || !canContinue}
        onClick={onContinue}
      >
        {getStepButtonText()}
      </button>
    </aside>
  );
};

export default BookingCartSidebar;

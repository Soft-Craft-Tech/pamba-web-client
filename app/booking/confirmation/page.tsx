"use client";
import BackArrow from "@/components/shared/back";
import { clearAllBookingData } from "@/utils/formPersistence";
import { useBookingCart } from "@/utils/providers/BookingCartProvider";
import { useRouter } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";

const ConfirmationPage = () => {
  const { cartInfo, cartServices, total, clearCart } = useBookingCart();
  const router = useRouter();

  const handleBackToHome = () => {
    clearAllBookingData();
    clearCart();
    router.push("/");
  };

  return (
    <div className="mx-auto max-w-screen-2xl px-4 w-full mt-5 relative">
      <BackArrow />

      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white rounded-xl border p-8 shadow-md">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <FaCheckCircle className="text-green-500 text-6xl" />
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Booking Confirmed!
          </h1>
          <p className="text-gray-600 mb-8">
            Your appointment has been successfully booked. You will receive a
            confirmation email shortly.
          </p>

          {/* Booking Summary */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
            <h2 className="font-semibold text-lg mb-4">Booking Summary</h2>
            
            {/* Business Information */}
            {cartInfo.business_name && (
              <div className="mb-4 pb-3 border-b">
                <h3 className="font-medium text-gray-900 mb-2">Business</h3>
                <p className="text-gray-700">{cartInfo.business_name}</p>
              </div>
            )}

            {/* Appointment Details */}
            {(cartInfo.date || cartInfo.time) && (
              <div className="mb-4 pb-3 border-b">
                <h3 className="font-medium text-gray-900 mb-2">Appointment Details</h3>
                <div className="space-y-1">
                  {cartInfo.date && (
                    <p className="text-gray-700">
                      <span className="font-medium">Date:</span> {new Date(cartInfo.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  )}
                  {cartInfo.time && (
                    <p className="text-gray-700">
                      <span className="font-medium">Time:</span> {cartInfo.time}
                    </p>
                  )}
                  {cartInfo.provider_name && (
                    <p className="text-gray-700">
                      <span className="font-medium">Provider:</span> {cartInfo.provider_name}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Services */}
            <div className="mb-4">
              <h3 className="font-medium text-gray-900 mb-2">Services</h3>
              <div className="space-y-3">
                {cartServices.map((service) => (
                  <div
                    key={service.id}
                    className="flex justify-between items-center"
                  >
                    <div>
                      <span className="font-medium">{service.service}</span>
                      <span className="text-sm text-gray-500 ml-2">
                        ({service.estimated_service_time} min)
                      </span>
                    </div>
                    <span className="font-semibold">Ksh {service.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="border-t pt-3 mt-3">
              <div className="flex justify-between items-center font-bold">
                <span>Total</span>
                <span>Ksh {total}</span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <h3 className="font-semibold text-blue-900 mb-2">What's Next?</h3>
            <ul className="text-sm text-blue-800 space-y-1 text-left">
              <li>
                • You'll receive a confirmation email with appointment details
              </li>
              <li>• Please arrive 10 minutes before your scheduled time</li>
              <li>• Contact the business if you need to reschedule</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleBackToHome}
              className="bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-primary/90 transition-colors"
            >
              Back to Home
            </button>
            <button
              onClick={() => window.print()}
              className="border border-gray-300 text-gray-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-50 transition-colors"
            >
              Print Receipt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;

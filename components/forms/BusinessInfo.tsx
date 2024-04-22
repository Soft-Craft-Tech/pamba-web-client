import React from "react";
import Image from "next/image";

const BusinessInfo = () => {
  return (
    <div className="w-full flex flex-col items-center gap-8 lg:gap-5 ">
      {/* {error && (
      <Toast
        message={
          [401, 400, 403, 404, 409].includes(error?.response?.status)
            ? error?.response?.data?.message
            : "Something went wrong"
        }
        type="error"
      />
    )} */}
      {/* {isSuccess && <Toast message={data?.message} type="success" />} */}
      <h3 className="font-medium w-full text-lg text-center">
        Business Information
      </h3>
      <div className="flex gap-2 w-32 h-3 justify-center items-center text-blue-500 font-semibold">
        <p>1</p>
        <div className="w-24 h-[3px] bg-blue-200 flex justify-start items-center text-center">
          <div className={`h-[3px] bg-blue-600 "w-full" `}>
            <>
              <input
                //   value={formData.name}
                //   onChange={handleInputChange}
                className="border w-full h-14 py-1 px-2 lg:h-12"
                type="text"
                name="name"
                required
                placeholder="Business Name"
              />
              <select
                //   value={formData.category}
                //   onChange={handleInputChange}
                className="text-gray-400 border w-full h-14 py-1 px-2  lg:h-12"
                name="category"
                required
              >
                <option value="">Business Category</option>
                <option value="Salon">Salon</option>
                <option value="SPA">Spa</option>
                <option value="Barbershop">Barbershop</option>
              </select>
              <input
                //   value={formData.phone}
                //   onChange={handleInputChange}
                className="border w-full h-14 py-1 px-2  lg:h-12"
                type="text"
                name="phone"
                required
                placeholder="Phone Number"
              />
              <input
                //   value={formData.city}
                //   onChange={handleInputChange}
                className="border w-full h-14 py-1 px-2  lg:h-12"
                type="text"
                name="city"
                required
                placeholder="City"
              />
              <input
                //   value={formData.mapUrl}
                //   onChange={handleInputChange}
                className="border w-full h-14 py-1 px-2  lg:h-12"
                type="url"
                name="mapUrl"
                required
                placeholder="Map URL"
              />
              <textarea
                //   value={formData.location}
                //   onChange={handleInputChange}
                className="border w-full h-14 py-1 px-2 resize-none rows-2  lg:h-12"
                name="location"
                required
                placeholder="Describe location"
              />
            </>
          </div>
        </div>
        <p>2</p>
      </div>
      <form className="p-3 w-full flex flex-col gap-4">
        <div className="flex flex-col gap-5 lg:gap-4">2</div>
        <div className="flex h-auto w-full">
          <button
            // disabled={isPending}
            type="submit"
            className="bg-primary w-full h-full py-4 rounded-md text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default BusinessInfo;

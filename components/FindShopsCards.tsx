import React from "react";
import Separator from "./shared/sectionSeparators/separator";
import Image from "next/image";
import Link from "next/link";

const FindShopsCards = () => {
  const sliderData = [
    { imageUrl: "/closeShops.svg", shopName: "Beauty spot salon" },
    { imageUrl: "/closeShops.svg", shopName: "Beauty spot salon" },
    { imageUrl: "/closeShops.svg", shopName: "Beauty spot salon" },
    { imageUrl: "/closeShops.svg", shopName: "Beauty spot salon" },
  ];
  return (
    <>
      <Separator
        btnText={"RECOMMENDED"}
        header={"Find premier shops and beauty centers close to you"}
      />
      <div className="flex flex-col lg:flex-row lg:w-full  justify-evenly mb-12 gap-x-4 gap-y-4">
        {sliderData.map(({ imageUrl, shopName }, index) => (
          <div
            key={index}
            className=" bg-white border  border-gray-200 rounded-lg shadow "
          >
            <Image
              className=" w-full h-auto"
              src={imageUrl}
              alt="pamba login"
              width={100}
              height={100}
            />
            <div className="p-5  w-full">
              <div className="flex flex-row items-center gap-x-1">
                <Image
                  className="w-10 h-10 rounded-full"
                  width={20}
                  height={20}
                  src="/user-icons/profile-icon.svg"
                  alt="Rounded avatar"
                />
                <p className="text-2xl">{shopName}</p>
              </div>
              <div className="flex flex-row mt-3 items-center gap-x-1">
                <svg
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="#000"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 5.08398C9.1712 5.08398 8.37634 5.41322 7.79029 5.99928C7.20424 6.58533 6.875 7.38018 6.875 8.20898C6.875 9.03779 7.20424 9.83264 7.79029 10.4187C8.37634 11.0047 9.1712 11.334 10 11.334C10.8288 11.334 11.6237 11.0047 12.2097 10.4187C12.7958 9.83264 13.125 9.03779 13.125 8.20898C13.125 7.38018 12.7958 6.58533 12.2097 5.99928C11.6237 5.41322 10.8288 5.08398 10 5.08398ZM10 10.084C9.50272 10.084 9.02581 9.88644 8.67417 9.53481C8.32254 9.18318 8.125 8.70626 8.125 8.20898C8.125 7.7117 8.32254 7.23479 8.67417 6.88316C9.02581 6.53153 9.50272 6.33398 10 6.33398C10.4973 6.33398 10.9742 6.53153 11.3258 6.88316C11.6775 7.23479 11.875 7.7117 11.875 8.20898C11.875 8.70626 11.6775 9.18318 11.3258 9.53481C10.9742 9.88644 10.4973 10.084 10 10.084ZM10 1.33398C8.17731 1.33619 6.42991 2.06123 5.14108 3.35006C3.85224 4.6389 3.12721 6.3863 3.125 8.20898C3.125 10.6623 4.25833 13.2623 6.40667 15.7282C7.37127 16.8429 8.45714 17.8466 9.64417 18.7207C9.74929 18.7943 9.87454 18.8339 10.0029 18.8339C10.1313 18.8339 10.2565 18.7943 10.3617 18.7207C11.5469 17.8465 12.6311 16.8431 13.5942 15.729C15.7383 13.2623 16.875 10.6623 16.875 8.20898C16.8728 6.3863 16.1478 4.6389 14.8589 3.35006C13.5701 2.06123 11.8227 1.33619 10 1.33398ZM10 17.4282C8.70833 16.4115 4.375 12.6815 4.375 8.20898C4.375 6.71714 4.96763 5.2864 6.02252 4.23151C7.07742 3.17662 8.50816 2.58398 10 2.58398C11.4918 2.58398 12.9226 3.17662 13.9775 4.23151C15.0324 5.2864 15.625 6.71714 15.625 8.20898C15.625 12.6798 11.2917 16.4123 10 17.4282Z"
                    fill="black"
                  />
                </svg>
                <p className="text-xl text-grayArea">
                  124 street Lavington, Nairobi
                </p>
              </div>
              <div className="w-full flex mt-3 justify-between items-center">
                <div className="flex bg-[#DB147114] p-2 rounded-2xl  flex-row gap-x-1 items-center">
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 17 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.208 14.1315L12.0941 16.5771C12.8057 17.0253 13.6735 16.3579 13.4844 15.517L12.4444 10.9023L15.8676 7.78287C16.4926 7.2139 16.1533 6.13869 15.3304 6.07229L10.8138 5.68261L9.03579 1.32411C8.71592 0.532535 7.63142 0.535274 7.31555 1.32845L5.55957 5.68609L1.04497 6.09857C0.222423 6.16913 -0.111427 7.24604 0.516394 7.81184L3.95536 10.914L2.93862 15.5339C2.75376 16.3757 3.62491 17.0387 4.3343 16.5869L8.208 14.1315Z"
                      fill="#DB1471"
                    />
                  </svg>
                  <p>4.9</p>
                </div>
                <p className="text-xl">104 reviews</p>
              </div>
              <button className="w-full px-5 mt-3 py-2 border border-primary rounded-full text-primary font-medium md:px-7 md:py-3">
                Explore
              </button>
            </div>
          </div>
        ))}
      </div>
      <Link
        href="booking/find-services"
        className="bg-primary flex items-center w-max py-2 px-4  text-white font-medium rounded-full gap-2 sm:py-4 sm:px-8 lg:py-3 lg:px-5 z-10"
      >
        View All Shops
        <Image
          className="border bg-white rounded-full"
          src="/arrow-right.svg"
          alt="arrow-icon"
          width={20}
          height={20}
        />
      </Link>
    </>
  );
};

export default FindShopsCards;

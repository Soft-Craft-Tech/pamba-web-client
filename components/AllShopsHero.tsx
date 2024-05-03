import FilterIcon from "@/icons/filter";
import React from "react";

const AllShopsHero = () => {
  const filterBtn = [
    "BarberShop",
    "Salon",
    "Spa",
    "Stylist",
    "Makeup",
    "Waxing",
    "Nail Parlor",
  ];
  return (
    <section className="h-auto">
      <div
        className="w-full px-10 flex flex-col items-center h-[60vh] justify-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/all-shops.png')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <p className="text-white text-[50px] font-bold max-w-[900px] text-center">
          Discover Your Perfect Look: Explore Services Near You
        </p>
        <div className="flex bg-white w-full mt-4 justify-between max-w-[940px] rounded-md px-4 py-2">
          <div className="flex flex-row w-3/4">
            <div className="flex flex-row items-center gap-1">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="#000"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.76 10.354L17.49 16.084L16 17.574L10.27 11.844C9.2 12.614 7.91 13.084 6.5 13.084C2.91 13.084 0 10.174 0 6.58399C0 2.99398 2.91 0.0839844 6.5 0.0839844C10.09 0.0839844 13 2.99398 13 6.58399C13 7.99399 12.53 9.28399 11.76 10.354ZM6.5 2.08398C4.01 2.08398 2 4.09399 2 6.58399C2 9.07399 4.01 11.084 6.5 11.084C8.99 11.084 11 9.07399 11 6.58399C11 4.09399 8.99 2.08398 6.5 2.08398Z"
                  fill="#323232"
                />
              </svg>
              <input
                type="text"
                placeholder="Service"
                className="py-2 px-4 text-black focus:outline-primary"
              />
            </div>
            <div className="flex flex-row items-center w-full gap-1">
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
              <input
                type="text"
                placeholder="Shop"
                className="py-2 px-4 w-full text-black focus:outline-primary"
              />
            </div>
          </div>
          <button className="bg-primary hover:bg-primary text-white font-bold py-2 px-4 rounded-r-md">
            Search
          </button>
        </div>
        <div className="flex flex-row mt-10 w-full max-w-[800px] justify-between">
          <button className="flex items-center justify-center bg-[#00000040] p-4 rounded-full">
            <FilterIcon />
          </button>
          {filterBtn.map((text, index) => (
            <button
              key={index}
              className="flex items-center text-white font-bold justify-center bg-[#00000040] p-4 rounded-full"
            >
              {text}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllShopsHero;

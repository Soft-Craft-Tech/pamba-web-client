import React from "react";
import Separator from "./shared/sectionSeparators/separator";
import Image from "next/image";
import Link from "next/link";
import Explorer from "./Explorer";
import { DynamicObject } from "./types";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";

const FindShopsCards = ({ sliderData }: { sliderData: DynamicObject[] }) => {
  return (
    <>
      <Separator
        btnText={"RECOMMENDED"}
        header={"Find premier shops and beauty centers close to you"}
      />
      <div className="w-full">
        <Swiper
          modules={[Autoplay, Navigation]}
          navigation={true}
          slidesPerView={1}
          spaceBetween={0}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="mySwiper w-full"
        >
          {sliderData?.map(
            ({ profile_img, business_name, id, location, slug }) => (
              <SwiperSlide key={id} className="">
                <Explorer
                  imageUrl={profile_img}
                  shopName={business_name}
                  location={location}
                  href={slug}
                />
              </SwiperSlide>
            )
          )}
        </Swiper>
      </div>
      <Link
        href="/booking/all-shops"
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

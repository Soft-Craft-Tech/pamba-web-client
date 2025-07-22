"use client";

import React from "react";
import ShopSepartor from "@/components/shared/sectionSeparators/shopsSeparator";
import Explorer from "@/components/Explorer";
import { DynamicObject } from "@/components/types";

type RelatedServicesProps = {
  filteredServices: DynamicObject[];
  data: any;
};

const RelatedServices: React.FC<RelatedServicesProps> = ({ filteredServices, data }) => {
  if (!filteredServices.length) return null;
  return (
    <>
      <div className="mx-auto max-w-screen-2xl w-full mt-10 relative">
        <ShopSepartor header="You might also like" />
      </div>
      <section className="mx-auto max-w-screen-2xl w-full my-10 relative">
        <div className="w-full flex flex-wrap gap-12">
          {filteredServices.map(({ service_image, service, id, location, price }: DynamicObject) => (
            <Explorer
              key={id}
              imageUrl={service_image}
              shopName={service}
              location={location}
              href={id}
              booking={true}
              btnText="Book Appointment"
              price={price}
              rating={data?.business?.rating}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default RelatedServices; 
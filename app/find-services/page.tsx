import * as React from "react";
import RevampedHeader from "@/components/shared/header/revampedHeader";
import ServiceHero from "@/components/service-hero";
import { CategoryCard } from "@/components/core/cards/categoryCard";
import Separator from "@/components/shared/sectionSeparators/separator";

const FindServices: React.FC = () => {
  return (
    <div>
      <RevampedHeader />
      <ServiceHero />
      <div
        className="mx-auto flex flex-col items-center justify-center py-16 max-w-screen-xl
         w-full"
      >
        <Separator
          btnText={"SERVICE CATEGORIES"}
          header={"Discover Your Ultimate Beauty and wellness Destination"}
        />
        <section className="pb-16 flex justify-center lg:px-20 lg:pb-16 w-full lg:w-2/3">
          <div className="w-full flex flex-wrap gap-12 justify-evenly">
            <CategoryCard img="/barberSalon.svg" text="Barbersalon" />
            <CategoryCard img="/make-up.svg" text="Barbersalon" />
            <CategoryCard img="/wedding-stylist.svg" text="Barbersalon" />
            <CategoryCard img="/massage-spa.svg" text="Barbersalon" />
            <CategoryCard img="/tattoo-parlor.svg" text="Barbersalon" />
            <CategoryCard img="/makestar.svg" text="Barbersalon" />
          </div>
        </section>
      </div>
    </div>
  );
};

export default FindServices;

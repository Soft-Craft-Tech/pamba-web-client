import * as React from "react";
import RevampedHeader from "@/components/shared/header/revampedHeader";
import ServiceHero from "@/components/service-hero";
import { CategoryCard } from "@/components/core/cards/categoryCard";

const FindServices: React.FC = () => {
  return (
    <div>
      <RevampedHeader />
      <ServiceHero />
      <div
        className="mx-auto flex flex-col items-center justify-center py-32 max-w-screen-xl
         w-full"
      >
        <div className="px-0.5 py-2 text-primary rounded-lg bg-gradient-to-r  md:from-[#EFE5EF]">
          SERVICE CATEGORIES
        </div>
        <div className="w-full flex flex-wrap gap-6 justify-center lg:w-2/3">
          <CategoryCard img="/barberSalon.svg" text="Barbersalon" />
          <CategoryCard img="/barberSalon.svg" text="Barbersalon" />
          <CategoryCard img="/barberSalon.svg" text="Barbersalon" />
          <CategoryCard img="/barberSalon.svg" text="Barbersalon" />
          <CategoryCard img="/barberSalon.svg" text="Barbersalon" />
          <CategoryCard img="/barberSalon.svg" text="Barbersalon" />
        </div>
      </div>
    </div>
  );
};

export default FindServices;

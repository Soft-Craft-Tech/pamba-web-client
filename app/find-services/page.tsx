import * as React from "react";
import RevampedHeader from "@/components/shared/header/revampedHeader";
import ServiceHero from "@/components/service-hero";

const FindServices: React.FC = () => {
  return (
    <div>
      <RevampedHeader />
      <ServiceHero />
    </div>
  );
};

export default FindServices;

import ValuePrepositionCard from "@/components/core/cards/pambaValueCards";
import CTA from "@/components/features/home/ctaSection";
import ClientManagementServices from "@/components/features/services/clientManagementFunctionalities";
import ServicesHero from "@/components/features/services/servicesHero";
import PambaFAQS from "@/components/shared/faqs/faqSection";
import Footer from "@/components/shared/footer/footer";
import Header from "@/components/shared/header/header";

const Scheduling = () => {
  return (
    <div>
      <Header page="scheduling" />
      <ServicesHero
        title="Client Management"
        text="Pamba simplifies client management by presenting appointment schedules, 
                including staff assigned to each client and allocated time slots for every appointment."
        image="/client-management.svg"
      />
      <div className="w-full h-auto bg-white p-5 flex flex-col items-center gap-16 sm:p-10 lg:p-20">
        <h2 className="font-bold text-center text-2xl lg:text-3xl lg:w-max">
          <span className="text-primary">Effortless</span> client and
          appointment management.
        </h2>
        <div className="flex flex-col gap-10 lg:flex-row">
          <ValuePrepositionCard
            title="Easy Scheduling"
            text="Pamba streamlines client appointment management, enabling efficient scheduling. 
                        It empowers you to plan your day more effectively and maximize productivity."
            image="/calendar-icon.svg"
          />
          <ValuePrepositionCard
            title="Instant Notifications"
            text="Experience instant notification functionality within Pamba, ensuring you receive immediate alerts as soon as appointments are booked. "
            image="/notification.svg"
          />
        </div>
      </div>
      <ClientManagementServices />
      <PambaFAQS />
      <CTA />
      <Footer />
    </div>
  );
};

export default Scheduling;

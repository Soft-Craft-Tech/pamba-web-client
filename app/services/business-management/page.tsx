import ValuePrepositionCard from "@/components/core/cards/pambaValueCards";
import CTA from "@/components/features/home/ctaSection";
import PambaFAQS from "@/components/shared/faqs/faqSection";
import Footer from "@/components/shared/footer/footer";
import Header from "@/components/shared/header/header";
import ServicesHero from "@/components/features/services/servicesHero";
import BusinessManagementServices from "@/components/features/services/businessManagementFunctionalities";
import ContactCTA from "@/components/features/services/contactCTA";

export default function BusinessManagement() {
  return (
    <div className="overflow-x-hidden">
      <Header page="business" />
      <ServicesHero
        title=" Business Management"
        text="Leave behind manual bookeeping and embrace a more organized business management approach with everything online. "
        image="/pamba-dashboard.svg"
      />
      <div className="w-full h-auto bg-white p-5 flex flex-col items-center gap-16 sm:p-10 lg:p-20">
        <h2 className="font-bold text-center text-3xl lg:w-max">
          What Pamba brings to your Business
        </h2>
        <div className="flex flex-col gap-10 lg:flex-row">
          <ValuePrepositionCard
            title="Everything in one app"
            text="Pamba consolidates all business essentials seamlessly in one app, 
                        providing you with a centralized hub that meets all your needs"
            image="/dashboard-icon.svg"
          />
          <ValuePrepositionCard
            title="Analytics"
            text="Get data visualizations and derive actionable insights from your business data. Promote data driven decision making."
            image="/insights-icon.svg"
          />
          <ValuePrepositionCard
            title="Convenience"
            text="Access Pamba app on your laptop, phone and tablet. Wherever you go, your business is with you."
            image="/responsive-icon.svg"
          />
        </div>
      </div>
      <BusinessManagementServices />
      <ContactCTA />
      <PambaFAQS />
      <CTA />
      <Footer />
    </div>
  );
}

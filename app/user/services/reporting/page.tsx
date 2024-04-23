import ValuePrepositionCard from "@/components/core/cards/pambaValueCards";
import CTA from "@/components/features/home/ctaSection";
import AnalyticsService from "@/components/features/services/analyticsFunctionalities";
import ServicesHero from "@/components/features/services/servicesHero";
import PambaFAQS from "@/components/shared/faqs/faqSection";
import Footer from "@/components/shared/footer/footer";
import Header from "@/components/shared/header/header";

export default function Reporting() {
  return (
    <div>
      <Header page="reporting" />
      <ServicesHero
        title="Reporting and Analytics"
        text="Pamba's Analytics and Reporting feature enables data-driven decision-making for businesses. 
                With insights into sales, expenses, and performance metrics, optimize strategies for sustainable growth."
        image="/pamba-analytics.svg"
      />
      <div className="w-full h-auto bg-white p-5 flex flex-col items-center gap-16 sm:p-10 lg:p-20">
        <h2 className="font-bold text-center text-2xl lg:text-3xl lg:w-max">
          Foster <span className="text-primary">Data</span> Driven Decision
          Making
        </h2>
        <div className="flex flex-col gap-10 lg:flex-row">
          <ValuePrepositionCard
            title="Export Data"
            text="Pamba allows you to export data to CSV/Excel formats for further in-depth analysis, empowering users to make informed decisions ."
            image="/reports-icon.svg"
          />
          <ValuePrepositionCard
            title="Analytics"
            text="Get data visualizations and derive actionable insights from your business data. Promote data driven decision making."
            image="/insights-icon.svg"
          />
        </div>
      </div>
      <AnalyticsService />
      <PambaFAQS />
      <CTA />
      <Footer />
    </div>
  );
}

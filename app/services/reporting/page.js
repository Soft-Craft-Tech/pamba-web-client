import Header from "@/app/components/shared/header/header";
import ServicesHero from "@/app/components/features/services/servicesHero";
import AnalyticsValue from "@/app/components/features/services/analyticsValue";
import AnalyticsService from "@/app/components/features/services/analyticsFunctionalities";
import PambaFAQS from "@/app/components/shared/faqs/faqSection";
import CTA from "@/app/components/features/home/ctaSection";
import Footer from "@/app/components/shared/footer/footer";

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
            <AnalyticsValue />
            <AnalyticsService />
            <PambaFAQS />
            <CTA />
            <Footer />
        </div>
    )
}
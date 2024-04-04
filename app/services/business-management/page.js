import Header from "../../components/shared/header/header";
import ServicesHero from "../../components/features/services/servicesHero";
import CTA from "@/app/components/features/home/ctaSection";
import ServiceValues from "@/app/components/features/services/businessManagementValue";
import BusinessManagementServices from "@/app/components/features/services/businessManagementFunctionalities";
import ContactCTA from "@/app/components/features/services/contactCTA";
import PambaFAQS from "@/app/components/shared/faqs/faqSection";
import Footer from "@/app/components/shared/footer/footer";
export default function BusinessManagement() {
    return (
        <div>
            <Header page="business" />
            <ServicesHero
                title=" Business Management the easy way"
                text="Leave behind manual bookeeping and embrace a more organized business management style with everything online. 
                See your sales, income, expenses side by side."
                image="/pamba-dashboard.svg"
            />
            <ServiceValues />
            <BusinessManagementServices />
            <ContactCTA />
            <PambaFAQS />
            <CTA />
            <Footer />
        </div>
    )
}
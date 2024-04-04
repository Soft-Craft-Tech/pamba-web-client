import Header from "@/app/components/shared/header/header";
import ServicesHero from "@/app/components/features/services/servicesHero";
import ClientManagementValue from "@/app/components/features/services/clientManagementValue";
import ClientManagementServices from "@/app/components/features/services/clientManagementFunctionalities";
import PambaFAQS from "@/app/components/shared/faqs/faqSection";
import CTA from "@/app/components/features/home/ctaSection";
import Footer from "@/app/components/shared/footer/footer";
export default function Scheduling() {
    return (
        <div>
            <Header page="scheduling" />
            <ServicesHero 
                title="Client Management"
                text="Pamba simplifies client management by presenting appointment schedules, 
                including staff assigned to each client and allocated time slots for every appointment."
                image="/client-management.svg"
            />
            <ClientManagementValue />
            <ClientManagementServices />
            <PambaFAQS />
            <CTA />
            <Footer />
        </div>
    )
}
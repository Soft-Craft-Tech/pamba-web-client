import Header from "../components/shared/header/header";
import CTA from "../components/features/home/ctaSection";
import AboutHero from "../components/features/about/aboutHero";
import PambaStory from "../components/features/about/pambaStory";
import Footer from "../components/shared/footer/footer";
import CoreValues from "../components/features/about/coreValues";
export default function AboutPage() {
    return (
        <div className="w-full">
            <Header />
            <AboutHero />
            <PambaStory />
            <CoreValues />
            <CTA />
            <Footer />
        </div>
    )
}
import AboutHero from "@/components/features/about/aboutHero";
import CoreValues from "@/components/features/about/coreValues";
import PambaStory from "@/components/features/about/pambaStory";
import CTA from "@/components/features/home/ctaSection";
import Footer from "@/components/shared/footer/footer";
import Header from "@/components/shared/header/header";

export default function AboutPage() {
  return (
    <div className="w-full container">
      <Header page="about" />
      <AboutHero />
      <PambaStory />
      <CoreValues />
      <CTA />
      <Footer />
    </div>
  );
}

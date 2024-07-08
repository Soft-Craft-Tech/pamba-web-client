import AppSection from "@/components/features/home/appSection";
import CategoriesSection from "@/components/features/home/categoriesSection";
import CTA from "@/components/features/home/ctaSection";
import Hero from "@/components/features/home/hero";
import OurStats from "@/components/features/home/ourStats";
import Services from "@/components/features/home/services";
import Footer from "@/components/shared/footer/footer";
import Header from "@/components/shared/header/header";
import Separator from "@/components/shared/sectionSeparators/separator";

export default function Home() {
  return (
    <main className="container">
      <Header page="home" />
      <Hero />
      <Separator
        btnText={"Our Services"}
        header={"We Have a Solution for Your Every Business Need."}
      />
      <Services />
      <Separator
        btnText={"Businesses We serve"}
        header={"Empowering Businesses, Transforming Industries"}
      />
      <CategoriesSection />
      <AppSection />
      <OurStats />
      <CTA />
      <Footer />
    </main>
  );
}

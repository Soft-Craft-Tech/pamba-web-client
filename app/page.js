import Hero from "./components/features/home/hero";
import Header from "./components/shared/header/header";
import Services from "./components/features/home/services";
import Separator from "./components/shared/sectionSeparators/separator";
import AppSection from "./components/features/home/appSection";
import OurStats from "./components/features/home/ourStats";
import CTA from "./components/features/home/ctaSection";
import Footer from "./components/shared/footer/footer";
import CategoriesSection from "./components/features/home/categoriesSection";

export default function Home() {
	return (
		<main className="">
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

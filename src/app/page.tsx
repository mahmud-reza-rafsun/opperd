import Banner from "@/components/Layout/Banner/Banner";
import FeaturesSection from "@/components/Layout/Features/Features";
import Navbar from "@/components/Layout/Navbar/Navbar";
import PricingSection from "@/components/Layout/Pricing/Pricing";
import ServicesCarousel from "@/components/Layout/Service/Service";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Banner />
      <FeaturesSection />
      <ServicesCarousel />
      <PricingSection />
    </div>
  );
}

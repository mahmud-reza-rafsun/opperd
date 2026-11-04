import HeroBanner from "@/components/Layout/Banner/HeroBanner";
import BannerHero from "@/components/Layout/BannerHero/BannerHero";
import Category from "@/components/Layout/Category/Category";

export default function Home() {
  return (
    <div className="">
      <HeroBanner />
      <Category />
      <BannerHero />
    </div>
  );
}

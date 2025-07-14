import { AboutSection } from "@/components/home/AboutSection";
import { FeaturedProperties } from "@/components/home/FeaturedProperties";
import { HeroSection } from "@/components/home/HeroSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";


export default function Home() {
  return (
    <div>
        <HeroSection/>
        <ServicesSection />
        {/* <FeaturedProperties /> */}
         <FeaturedProperties preferredCategory="residential" />
        <AboutSection />
        <TestimonialsSection />
    </div>
  );
}

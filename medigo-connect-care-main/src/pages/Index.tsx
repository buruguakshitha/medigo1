
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CtaSection from "@/components/home/CtaSection";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

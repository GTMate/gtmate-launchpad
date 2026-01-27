import Navbar from "@/components/Navbar";
import MetricsBar from "@/components/MetricsBar";
import HeroSection from "@/components/HeroSection";
import LogosSection from "@/components/LogosSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import GtmPartnersSection from "@/components/GtmPartnersSection";
import PricingSection from "@/components/PricingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import MainFooter from "@/components/MainFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <MetricsBar />
        <HeroSection />
       {/* <LogosSection /> */}
       {/* <HowItWorksSection /> */}
        <GtmPartnersSection />
        <PricingSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
        <MainFooter />
      </div>
    </div>
  );
};

export default Index;

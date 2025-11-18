import Navbar from "@/components/Navbar";
import MetricsBar from "@/components/MetricsBar";
import HeroSection from "@/components/HeroSection";
import LogosSection from "@/components/LogosSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import ExpansionsSection from "@/components/ExpansionsSection";
import GtmPartnersSection from "@/components/GtmPartnersSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import IsThisForYouSection from "@/components/IsThisForYouSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import MainFooter from "@/components/MainFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <HeroSection />
        <MetricsBar />
        <LogosSection />
        <HowItWorksSection />
        <ExpansionsSection />
        <GtmPartnersSection />
        <TestimonialsSection />
        <IsThisForYouSection />
        <FAQSection />
        <CTASection />
        <MainFooter />
      </div>
    </div>
  );
};

export default Index;

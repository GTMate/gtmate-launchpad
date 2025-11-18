import Navbar from "@/components/Navbar";
import MetricsBar from "@/components/MetricsBar";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import ExpansionsSection from "@/components/ExpansionsSection";
import GtmPartnersSection from "@/components/GtmPartnersSection";
import IsThisForYouSection from "@/components/IsThisForYouSection";
import MainFooter from "@/components/MainFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <MetricsBar />
        <HeroSection />
        <HowItWorksSection />
        <ExpansionsSection />
        <GtmPartnersSection />
        <IsThisForYouSection />
        <MainFooter />
      </div>
    </div>
  );
};

export default Index;

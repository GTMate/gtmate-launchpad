import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTypewriter } from "@/hooks/use-typewriter";
import MetricsBar from "@/components/MetricsBar";

const ROTATING_PHRASES = [
  "without building a local team.",
  "without hiring full-time sales reps.",
  "without spending months recruiting.",
  "without the overhead costs.",
  "without the risk of bad hires.",
] as const;

const HeroSection = () => {
  const typewriterText = useTypewriter(ROTATING_PHRASES, 80, 40, 2000);

  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden pb-20 sm:pb-24">
      {/* Dark background with city image effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1920&q=80')",
          filter: "brightness(0.3)"
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/50 to-background" />
      
      <div className="relative container mx-auto px-4 py-20 md:py-32 lg:py-40 w-full">
        <div className="mx-auto max-w-5xl">
          <h1 className="mb-4 md:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight text-foreground tracking-tight">
            Open your next market with a{" "}
            <span className="text-[#F5DEB3]">
              trusted local seller
            </span>{" "}
            —{" "}
            <span className="block sm:inline-block min-w-[280px] sm:min-w-[350px] md:min-w-[450px] text-muted-foreground font-semibold mt-2 sm:mt-0">
              {typewriterText}
              <span className="animate-pulse text-[#F5DEB3]">|</span>
            </span>
          </h1>
          <p className="mb-8 md:mb-10 text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl leading-relaxed text-muted-foreground">
            We match your company with experienced local sellers who already have
            the relationships, context and skills to start selling in{" "}
            <span className="text-foreground font-semibold">weeks, not years.</span>
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-start justify-start gap-3 sm:gap-4">
            <Button 
              asChild 
              size="lg" 
              className="w-full sm:w-auto bg-white hover:bg-gray-100 text-black shadow-lg hover:shadow-xl transition-all duration-300 text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 rounded-lg font-semibold"
            >
              <Link to="/contact">Talk to us →</Link>
            </Button>
            <Button 
              asChild 
              size="lg" 
              variant="outline"
              className="w-full sm:w-auto border-2 border-white/20 hover:bg-white/10 text-white backdrop-blur-sm shadow-lg transition-all duration-300 text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 rounded-lg font-semibold"
            >
              <Link to="/contact">View our network</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* MetricsBar positioned at bottom */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-0 right-0">
        <MetricsBar />
      </div>
    </section>
  );
};

export default HeroSection;

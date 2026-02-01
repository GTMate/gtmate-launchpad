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
    <section className="relative w-full min-h-[100vh] flex items-center overflow-hidden">
      {/* Dark background with city image effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1920&q=80')",
          filter: "brightness(0.3)"
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/50 to-background" />
      
      <div className="relative container mx-auto px-4 py-24 md:py-32 lg:py-40 w-full">
        <div className="mx-auto max-w-5xl">
          <h1 className="mb-6 text-5xl font-extrabold leading-tight text-foreground md:text-6xl lg:text-7xl tracking-tight">
            Open your next market with a{" "}
            <span className="text-[#F5DEB3]">
              trusted local seller
            </span>{" "}
            —{" "}
            <span className="inline-block min-w-[300px] sm:min-w-[400px] md:min-w-[550px] text-muted-foreground font-semibold">
              {typewriterText}
              <span className="animate-pulse text-[#F5DEB3]">|</span>
            </span>
          </h1>
          <p className="mb-10 text-xl text-muted-foreground md:text-2xl max-w-3xl leading-relaxed">
            We match your company with experienced local sellers who already have
            the relationships, context and skills to start selling in{" "}
            <span className="text-foreground font-semibold">weeks, not years.</span>
          </p>

          <div className="flex flex-col items-start justify-start gap-4 sm:flex-row">
            <Button 
              asChild 
              size="lg" 
              className="bg-white hover:bg-gray-100 text-black shadow-lg hover:shadow-xl transition-all duration-300 text-lg px-8 py-6 rounded-lg font-semibold"
            >
              <Link to="/contact">Talk to us →</Link>
            </Button>
            <Button 
              asChild 
              size="lg" 
              variant="outline"
              className="border-2 border-white/20 hover:bg-white/10 text-white backdrop-blur-sm shadow-lg transition-all duration-300 text-lg px-8 py-6 rounded-lg font-semibold"
            >
              <Link to="/contact">View our network</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* MetricsBar positioned at bottom */}
      <div className="absolute bottom-8 left-0 right-0">
        <MetricsBar />
      </div>
    </section>
  );
};

export default HeroSection;

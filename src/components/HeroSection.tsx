import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTypewriter } from "@/hooks/use-typewriter";
import MetricsBar from "@/components/MetricsBar";
import { useState, useEffect } from "react";

const ROTATING_PHRASES = [
  "without building a local team.",
  "without hiring full-time sales reps.",
  "without spending months recruiting.",
  "without the overhead costs.",
  "without the risk of bad hires.",
] as const;

const BACKGROUND_IMAGES = [
  "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1920&q=80", // City skyline
  "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=1920&q=80", // Madrid - Cuatro Torres Business Area
] as const;

const HeroSection = () => {
  const typewriterText = useTypewriter(ROTATING_PHRASES, 80, 40, 2000);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % BACKGROUND_IMAGES.length);
    }, 8000); // Cambiar cada 8 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-[75vh] md:min-h-[90vh] flex items-center overflow-hidden pb-8 sm:pb-12 md:pb-20">
      {/* Rotating background images with smooth transition */}
      {BACKGROUND_IMAGES.map((image, index) => (
        <div
          key={image}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{
            backgroundImage: `url('${image}')`,
            filter: "brightness(0.45)",
            opacity: currentImageIndex === index ? 1 : 0,
          }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/40 to-background" />
      
      <div className="relative container mx-auto px-4 pt-2 pb-4 md:py-16 lg:py-20 w-full">
        <div className="mx-auto max-w-5xl">
          <h1 className="mb-3 md:mb-4 text-[2.5rem] leading-tight sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-foreground tracking-tight">
            Open your next market with a{" "}
            <span className="text-[#F5DEB3]">
              trusted local seller
            </span>
            <br />
            <span className="block text-muted-foreground font-semibold min-h-[5rem] sm:min-h-[3rem] md:min-h-[3.5rem] lg:min-h-[4rem] mt-1 text-[2.25rem] sm:text-[inherit]">
              {typewriterText}
              <span className="animate-pulse text-[#F5DEB3]">|</span>
            </span>
          </h1>
          <p className="mb-4 md:mb-6 text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl leading-snug sm:leading-relaxed text-muted-foreground">
            We match your company with experienced local sellers who already have
            the relationships, context and skills to start selling in{" "}
            <span className="text-foreground font-semibold">weeks, not years.</span>
          </p>

          <Button 
            asChild 
            size="lg" 
            className="w-full sm:w-auto bg-white hover:bg-gray-100 text-black shadow-lg hover:shadow-[0_0_30px_rgba(245,222,179,0.6)] transition-all duration-300 text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 rounded-lg font-semibold border-2 border-transparent hover:border-[#F5DEB3]/50"
          >
            <Link to="/contact">Talk to us →</Link>
          </Button>
        </div>
      </div>

      {/* MetricsBar positioned at bottom */}
      <div className="absolute bottom-0 sm:bottom-2 md:bottom-4 left-0 right-0">
        <MetricsBar />
      </div>
    </section>
  );
};

export default HeroSection;

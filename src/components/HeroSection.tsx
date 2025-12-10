import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useTypewriter } from "@/hooks/use-typewriter";
import { useCallback, useMemo } from "react";

const ROTATING_PHRASES = [
  "without building a local team.",
  "without hiring full-time sales reps.",
  "without spending months recruiting.",
  "without the overhead costs.",
  "without the risk of bad hires.",
] as const;

const BENEFITS = [
  "Curated GTM partners across LATAM and Europe.",
  "Launch your go-to-market in weeks, not years.",
  "Commission-based model instead of fixed headcount.",
] as const;

const HeroSection = () => {
  const typewriterText = useTypewriter(ROTATING_PHRASES, 80, 40, 2000);
  
  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <section className="container mx-auto px-4 py-12 md:py-20">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="mb-6 text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
          Open your next market with the right GTM partner —{" "}
          <span className="inline-block min-w-[300px] sm:min-w-[400px] md:min-w-[500px]">
            {typewriterText}
            <span className="animate-pulse">|</span>
          </span>
        </h1>
        <p className="mb-8 text-lg text-muted-foreground md:text-xl">
          We match your company with experienced GTM partners who already have
          the relationships, context and skills to start selling in weeks, not
          years.
        </p>

        <div className="mb-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button 
            asChild 
            size="lg" 
            className="bg-[#874FFF] hover:bg-[#7043DD] text-white"
          >
            <Link to="/explore">Find a seller here</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="bg-white hover:bg-gray-50"
          >
            <button onClick={() => scrollToSection("gtm-partners")}>
              Become a GTM partner now! ! sss
            </button>
          </Button>
        </div>

        <div className="mx-auto max-w-2xl space-y-3">
          {BENEFITS.map((benefit) => (
            <div key={benefit} className="flex items-start justify-center gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <span className="text-muted-foreground">{benefit}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

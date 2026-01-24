import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTypewriter } from "@/hooks/use-typewriter";

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

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button 
            asChild 
            size="lg" 
            className="bg-[#874FFF] hover:bg-[#7043DD] text-white"
          >
            <Link to="/contact">Start Now</Link>
          </Button>
          
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

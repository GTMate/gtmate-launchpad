import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { useTypewriter } from "@/hooks/use-typewriter";

const HeroSection = () => {
  const rotatingPhrases = [
    "without building a local team.",
    "without hiring full-time sales reps.",
    "without spending months recruiting.",
    "without the overhead costs.",
    "without the risk of bad hires.",
  ];

  const typewriterText = useTypewriter(rotatingPhrases, 80, 40, 2000);
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const benefits = [
    "Curated GTM partners across LATAM and Europe.",
    "Launch your go-to-market in weeks, not years.",
    "Commission-based model instead of fixed headcount.",
  ];

  return (
    <section className="container mx-auto px-4 py-12 md:py-20">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
          Open your next market with the right GTM partner —{" "}
          <span className="inline-block min-w-[300px] text-left sm:min-w-[400px] md:min-w-[500px]">
            {typewriterText}
            <span className="animate-pulse">|</span>
          </span>
        </h1>
        <p className="mb-8 text-lg text-muted-foreground md:text-xl">
          We match your company with experienced GTM partners who already have
          the relationships, context and skills to start selling in weeks, not
          years.
        </p>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row">
          <Button asChild size="lg" variant="default">
            <a href="/apply">Get a GTM partner</a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => scrollToSection("gtm-partners")}
          >
            See GTM partner examples
          </Button>
        </div>

        <div className="space-y-3">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-start gap-3">
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

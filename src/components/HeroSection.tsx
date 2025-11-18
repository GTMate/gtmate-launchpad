import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import heroVisual from "@/assets/hero-visual.jpg";

const HeroSection = () => {
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
    <section className="container mx-auto px-4 py-20 md:py-32">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col justify-center">
          <h1 className="mb-6 text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
            Open your next market with the right GTM partner — without building
            a local team.
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

        <div className="flex items-center justify-center">
          <div className="relative">
            <img
              src={heroVisual}
              alt="Global market expansion visualization"
              className="rounded-lg border border-border shadow-2xl"
            />
            <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-background/60 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

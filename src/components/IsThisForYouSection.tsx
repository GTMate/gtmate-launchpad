import { Card, CardContent } from "@/components/ui/card";
import { Target, TrendingUp, Search } from "lucide-react";

const IsThisForYouSection = () => {
  const scenarios = [
    {
      icon: Target,
      title: "SaaS / AI from Europe → LATAM",
      description:
        "You've proven product-market fit in your home market and want to expand to Latin America without building a local team from scratch.",
    },
    {
      icon: TrendingUp,
      title: "Scale-ups in LATAM expanding regionally",
      description:
        "You're successful in one LATAM country and need local expertise to break into neighboring markets efficiently.",
    },
    {
      icon: Search,
      title: "Validate a market before investing heavily",
      description:
        "You want to test a new market with minimal risk and maximum local insight before committing to full-time hires.",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-20">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
          Is this for your company?
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {scenarios.map((scenario, index) => {
          const Icon = scenario.icon;
          return (
            <Card key={index} className="border-border bg-card">
              <CardContent className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-foreground">
                  {scenario.title}
                </h3>
                <p className="text-muted-foreground">{scenario.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default IsThisForYouSection;

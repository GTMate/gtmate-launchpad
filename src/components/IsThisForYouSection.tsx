import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, Rocket, FlaskConical, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const IsThisForYouSection = () => {
  const scenarios = [
    {
      icon: Globe,
      title: "European SaaS expanding to LATAM",
      description:
        "You have product-market fit in Europe and want to tap into Latin America's growing tech market without the cost and risk of building a local team.",
      ideal: ["B2B SaaS with €50k+ ACV", "Proven sales playbook", "Ready to invest in growth"],
    },
    {
      icon: Rocket,
      title: "LATAM scale-ups going regional",
      description:
        "You've dominated one market and need local expertise to replicate your success in Brazil, Mexico, or other high-growth economies.",
      ideal: ["$1M+ ARR in home market", "Scalable product", "Expansion budget approved"],
    },
    {
      icon: FlaskConical,
      title: "Testing new markets with low risk",
      description:
        "You want to validate demand in a new region before committing to full-time hires. Our commission model lets you test without the overhead.",
      ideal: ["Want to validate PMF", "Limited local knowledge", "Risk-averse approach"],
    },
  ];

  return (
    <section className="container mx-auto px-4 py-20">
      <div className="mb-12 text-center">
        <p className="text-sm font-medium text-[#874FFF] uppercase tracking-wide mb-2">
          Who we help
        </p>
        <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
          Is GTMate right for you?
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          We work best with B2B companies ready to expand internationally. Here's who sees the best results:
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-12">
        {scenarios.map((scenario, index) => {
          const Icon = scenario.icon;
          return (
            <Card key={index} className="border-border bg-card hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#874FFF]/10">
                  <Icon className="h-6 w-6 text-[#874FFF]" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-foreground">
                  {scenario.title}
                </h3>
                <p className="text-muted-foreground mb-4">{scenario.description}</p>
                <div className="border-t border-border pt-4">
                  <p className="text-xs font-medium text-muted-foreground uppercase mb-2">Ideal if you have:</p>
                  <ul className="space-y-1">
                    {scenario.ideal.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                        <CheckCircle2 className="h-4 w-4 text-[#874FFF] flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="text-center">
        <p className="text-muted-foreground mb-4">
          Not sure if GTMate is right for you? Let's talk.
        </p>
        <Button asChild variant="outline" className="group">
          <Link to="/contact">
            Schedule a call
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default IsThisForYouSection;

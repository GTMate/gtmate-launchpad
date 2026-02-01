import { Card, CardContent } from "@/components/ui/card";
import { FileText, Users, Rocket } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      icon: FileText,
      number: "01",
      title: "Share your expansion goals",
      description:
        "Tell us about your product, ideal customer profile, deal size, and target market. Takes less than 5 minutes.",
      highlight: "Quick start",
    },
    {
      icon: Users,
      number: "02",
      title: "Get matched and onboarded",
      description:
        "We match you with a vetted local seller and train them on your product, value proposition, and sales process so they can represent your business effectively.",
      highlight: "7-14 days",
    },
    {
      icon: Rocket,
      number: "03",
      title: "Start selling in your new market",
      description:
        "Your seller starts prospecting, booking meetings, and closing deals while you focus on your core market.",
      highlight: "Active prospecting",
    },
  ];

  return (
    <section id="how-it-works" className="border-t border-border bg-secondary/20 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-[#F5DEB3] uppercase tracking-wide mb-2">
            Simple Process
          </p>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl mb-4">
            From signup to selling in 3 steps
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            No lengthy negotiations. No recruitment headaches. Just a straightforward path to your next market.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card key={index} className="border-border bg-card relative overflow-hidden group hover:border-[#F5DEB3]/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#F5DEB3]/10">
                      <Icon className="h-6 w-6 text-[#F5DEB3]" />
                    </div>
                    <span className="text-xs font-medium text-[#F5DEB3] bg-[#F5DEB3]/10 px-3 py-1 rounded-full">
                      {step.highlight}
                    </span>
                  </div>
                  <div className="text-6xl font-bold text-primary/10 absolute -right-2 -bottom-4 group-hover:text-primary/20 transition-colors">
                    {step.number}
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground relative z-10">{step.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

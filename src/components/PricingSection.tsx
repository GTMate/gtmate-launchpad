import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const PRICING_PLANS = [
  {
    name: "STARTER",
    price: "",
    period: "",
    successFee: "",
    description: "Perfect for early validation and first steps into a new market",
    features: [
      "ICP & messaging",
      "Basic market research",
      "Outbound strategy templates",
      "Monthly strategy call",
      "KPI dashboard",
    ],
    cta: "Talk to Sales",
    ctaVariant: "outline" as const,
    popular: false,
    addOns: [
      "SDR Seat: × $3,000/mo",
      "GTM Hiring Support: $3,000–$5,000 per hire",
      "Sales Enablement Pack: +$1,000/mo",
    ],
  },
  {
    name: "SCALE",
    price: "",
    period: "",
    successFee: "",
    description: "Our most popular plan — end-to-end GTM launch execution",
    features: [
      "Full GTM playbook",
      "Multi-channel acquisition",
      "CRM & funnel setup",
      "SDR or GTM operator (part-time)",
    ],
    cta: "Talk to Sales",
    ctaVariant: "default" as const,
    popular: true,
    addOns: null,
  },
  {
    name: "ENTERPRISE",
    price: "",
    period: "",
    successFee: "",
    description: "Built for serious market expansion with dedicated resources",
    features: [
      "Dedicated GTM team (strategist + ops + SDR)",
      "Deep market analysis & pricing validation",
      "Full launch campaigns",
      "Hiring support for local GTM roles",
      "Weekly leadership alignment & custom reporting",
    ],
    cta: "Talk to Sales",
    ctaVariant: "outline" as const,
    popular: false,
    addOns: null,
  },
];

const PricingSection = () => {
  return (
    <section className="border-t border-border bg-background py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-[#FF6B35] uppercase tracking-wide mb-2">
            Pricing Plans
          </p>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            Launch your local sales with confidence
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
          {PRICING_PLANS.map((plan) => (
            <Card
              key={plan.name}
              className={`relative overflow-hidden ${
                plan.popular
                  ? "border-[#FF6B35] border-2 shadow-lg"
                  : "border-border"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0">
                  <Badge className="rounded-none rounded-bl-lg bg-[#FF6B35] text-white hover:bg-[#FF6B35]">
                    MOST POPULAR
                  </Badge>
                </div>
              )}
              <CardHeader className="text-center pb-2">
                <h3 className="text-sm font-bold tracking-wide text-muted-foreground">
                  {plan.name}
                </h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-foreground">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {plan.successFee}
                </p>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-center text-sm text-muted-foreground mb-6 min-h-[48px]">
                  {plan.description}
                </p>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-[#FF6B35] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  variant={plan.ctaVariant}
                  className={`w-full ${
                    plan.popular
                      ? "bg-[#FF6B35] hover:bg-[#E85A2A] text-white"
                      : ""
                  }`}
                >
                  <Link to="/contact">{plan.cta}</Link>
                </Button>

                {plan.addOns && (
                  <div className="mt-6 pt-6 border-t border-border">
                    <p className="text-sm font-semibold text-foreground mb-3">
                      Optional Add-Ons
                    </p>
                    <ul className="space-y-2">
                      {plan.addOns.map((addOn, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-xs text-muted-foreground"
                        >
                          <span>•</span>
                          <span>{addOn}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;


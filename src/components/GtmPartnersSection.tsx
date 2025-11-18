import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

const GtmPartnersSection = () => {
  const partners = [
    {
      location: "Mexico",
      region: "LATAM",
      experience: [
        "15+ years in enterprise SaaS sales",
        "Former VP Sales at leading fintech",
        "Network of 200+ CXO contacts",
        "Fluent in Spanish & English",
      ],
    },
    {
      location: "Brazil",
      region: "LATAM",
      experience: [
        "Built GTM for 3 successful B2B scale-ups",
        "Deep expertise in financial services",
        "Strong relationships with top VCs",
        "Fluent in Portuguese & English",
      ],
    },
    {
      location: "Argentina",
      region: "LATAM",
      experience: [
        "20+ years leading LATAM expansions",
        "Expert in data & analytics sector",
        "Established network across industries",
        "Fluent in Spanish & English",
      ],
    },
  ];

  return (
    <section
      id="gtm-partners"
      className="border-t border-border bg-secondary/20 py-20"
    >
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Local GTM partners ready to open your market
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            We don't show names or direct contacts — we manage the relationship
            to protect both sides.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {partners.map((partner, index) => (
            <Card key={index} className="border-border bg-card">
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="mb-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {partner.region}
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">
                    {partner.location}
                  </h3>
                </div>

                <div className="space-y-3">
                  {partner.experience.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <span className="text-sm text-muted-foreground">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button asChild className="w-full">
                  <a href="/apply">Request introduction</a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GtmPartnersSection;

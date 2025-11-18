import { Card, CardContent } from "@/components/ui/card";

const HowItWorksSection = () => {
  const steps = [
    {
      number: "01",
      title: "Tell us what you sell and where you want to go",
      description:
        "Short form with product, ICP, deal size and target country.",
    },
    {
      number: "02",
      title: "We find the best local GTM partner",
      description:
        "We select based on industry experience, network and sales motion fit.",
    },
    {
      number: "03",
      title: "We launch the go-to-market together",
      description:
        "Goals and commissions defined. Your GTM partner starts opening doors and closing deals.",
    },
  ];

  return (
    <section id="how-it-works" className="border-t border-border bg-secondary/20 py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold text-foreground md:text-4xl">
          How it works
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <Card key={index} className="border-border bg-card">
              <CardContent className="p-6">
                <div className="mb-4 text-5xl font-bold text-primary/30">
                  {step.number}
                </div>
                <h3 className="mb-3 text-xl font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

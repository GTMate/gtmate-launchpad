import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ExpansionsSection = () => {
  const expansions = [
    {
      title: "AI SaaS → Mexico",
      segment: "Enterprise",
      origin: "Europe",
      goal: "Break into LATAM enterprise market",
      dealSize: "$50K-$150K ARR",
      status: "Active · 2 qualified leads",
    },
    {
      title: "B2B Fintech → Brazil",
      segment: "Mid-Market / Enterprise",
      origin: "Spain",
      goal: "Establish presence in Brazilian market",
      dealSize: "$30K-$100K ARR",
      status: "Active · First deal in negotiation",
    },
    {
      title: "Data platform → Argentina & Chile",
      segment: "Mid-Market",
      origin: "US",
      goal: "Regional expansion with local partners",
      dealSize: "$20K-$80K ARR",
      status: "Active · 5 discovery calls scheduled",
    },
  ];

  return (
    <section id="expansions" className="container mx-auto px-4 py-20">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
          Expansions in progress
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Examples of real expansion projects our GTM partners are currently
          running.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {expansions.map((expansion, index) => (
          <Card key={index} className="border-border bg-card">
            <CardContent className="p-6">
              <div className="mb-2 text-sm font-medium text-primary">
                {expansion.origin}
              </div>
              <h3 className="mb-3 text-xl font-bold text-foreground">
                {expansion.title}
              </h3>
              <div className="mb-4 inline-block rounded-full bg-secondary px-3 py-1 text-xs font-medium text-foreground">
                {expansion.segment}
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Goal:</span>
                  <span className="text-foreground">{expansion.goal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Deal size:</span>
                  <span className="text-foreground">{expansion.dealSize}</span>
                </div>
                <div className="mt-3 rounded-md bg-secondary/50 px-3 py-2">
                  <span className="text-xs font-medium text-foreground">
                    {expansion.status}
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Button asChild variant="outline" className="w-full">
                <Link to="/apply">
                  I want something similar
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default ExpansionsSection;

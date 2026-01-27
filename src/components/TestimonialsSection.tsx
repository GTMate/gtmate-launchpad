import { Card, CardContent } from "@/components/ui/card";

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote:
        "We went from zero to first customer in Mexico in 45 days. Our local seller had the network and knew exactly how to position our product.",
      author: "Sarah Chen",
      role: "VP of Sales, AI SaaS Company",
      company: "Previously 0 revenue in LATAM",
    },
    {
      quote:
        "Instead of hiring 3 people and waiting 6 months, we had someone selling week one. The commission model means we only pay for results.",
      author: "Marcus Silva",
      role: "Co-founder, B2B Fintech",
      company: "€2M+ in new market ARR",
    },
    {
      quote:
        "Our seller brought relationships we could never have built ourselves. They understand local business culture and speak the language.",
      author: "Laura Martinez",
      role: "Head of International, Data Platform",
      company: "Now active in 4 LATAM markets",
    },
  ];

  return (
    <section className="border-t border-border bg-background py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-4 text-center text-3xl font-bold text-foreground md:text-4xl">
          What our clients say
        </h2>
        <p className="mb-12 text-center text-muted-foreground">
          Real results from companies that expanded with GTMate
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-border bg-card">
              <CardContent className="p-6">
                <p className="mb-6 text-foreground leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="border-t border-border pt-4">
                  <p className="font-semibold text-foreground">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {testimonial.company}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

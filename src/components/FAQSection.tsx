import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "How is this different from hiring a local sales rep?",
      answer:
        "Our sellers are experienced sales leaders with existing networks, not entry-level reps. They work on commission, so you pay for results, not salaries. And they start selling immediately—no 3-month ramp time.",
    },
    {
      question: "What if the local seller doesn't perform?",
      answer:
        "We monitor performance closely and can replace sellers if needed. Since it's commission-based, you're not locked into fixed costs. We also set clear 30-60-90 day goals upfront.",
    },
    {
      question: "How long does it take to get started?",
      answer:
        "Typically 7-14 days from application to first intro call with your matched local seller. Most partners start outreach within their first week.",
    },
    {
      question: "Do I need to provide leads, or do they generate their own?",
      answer:
        "Your sellers generates their own leads using their local network and market knowledge. You provide sales materials, pricing, and product training. They handle prospecting, demos, and closing.",
    },
    {
      question: "Can I work with multiple sellers at once?",
      answer:
        "Yes, absolutely. Many clients use different sellers for different markets or verticals. We help coordinate to avoid overlap.",
    },
  ];

  return (
    <section className="border-t border-border bg-secondary/20 py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="mb-4 text-center text-3xl font-bold text-foreground md:text-4xl">
          Frequently asked questions
        </h2>
        <p className="mb-12 text-center text-muted-foreground">
          Everything you need to know about working with local sellers
        </p>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-foreground hover:text-foreground">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;

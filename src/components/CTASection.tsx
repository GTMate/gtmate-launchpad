import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="border-t border-border bg-background py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-5xl">
            Ready to open your next market?
          </h2>
          <p className="mb-8 text-lg text-muted-foreground md:text-xl">
            Browse our vetted GTM partners and find the perfect match for your expansion goals.
          </p>
          <Button 
            asChild 
            size="lg" 
            className="group bg-[#874FFF] hover:bg-[#7043DD]"
          >
            <Link to="/contact">
              Start Now
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <p className="mt-6 text-sm text-muted-foreground">
            No upfront fees · Commission-based · Start in 30 days
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

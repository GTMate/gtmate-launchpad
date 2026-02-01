import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="relative border-t border-border bg-background py-24 md:py-32 overflow-hidden">
      <div className="relative container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-4xl font-extrabold text-foreground md:text-6xl tracking-tight leading-tight">
            Ready to open your{" "}
            <span className="text-[#F5DEB3]">
              next market?
            </span>
          </h2>
          <p className="mb-10 text-xl text-muted-foreground md:text-2xl max-w-2xl mx-auto">
            Browse our vetted local sellers and find the right match to expand into new markets.
          </p>
          <Button 
            asChild 
            size="lg" 
            className="group bg-white hover:bg-gray-100 text-black shadow-lg hover:shadow-xl transition-all duration-300 text-lg px-10 py-7 rounded-full font-semibold"
          >
            <Link to="/contact">
              Start Now
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-[#F5DEB3]" />
              No upfront fees
            </span>
            <span className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-[#F5DEB3]" />
              Commission-based
            </span>
            <span className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-[#F5DEB3]" />
              Start in 30 days
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

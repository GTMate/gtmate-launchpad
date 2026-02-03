import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="relative border-t border-border bg-background py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden">
      <div className="relative container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 sm:mb-5 md:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight leading-tight">
            Ready to open your{" "}
            <span className="text-[#F5DEB3]">
              next market?
            </span>
          </h2>
          <p className="mb-8 sm:mb-9 md:mb-10 text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Stop losing time and revenue to market entry delays. Let's connect you with the right local seller and unlock your next growth opportunity—starting today.
          </p>
          <Button 
            asChild 
            size="lg" 
            className="group bg-white hover:bg-gray-100 text-black shadow-lg hover:shadow-xl transition-all duration-300 text-base sm:text-lg px-8 sm:px-10 py-6 sm:py-7 rounded-full font-semibold w-full sm:w-auto"
          >
            <Link to="/contact">
              Start Now
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

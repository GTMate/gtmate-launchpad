import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-6 text-6xl font-bold text-foreground md:text-8xl">404</h1>
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Page not found
          </h2>
          <p className="mb-8 text-lg text-muted-foreground md:text-xl">
            We couldn't find this page, but we're really good at finding the best GTM partners
            to expand your business to new markets.
          </p>
          
          <div className="mb-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" variant="default" className="group">
              <Link to="/apply">
                Get a GTM partner
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/">Return to Home</Link>
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground">
          Carefully vetted GTM partners · Local market expertise · Real sales conversations, not leads
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

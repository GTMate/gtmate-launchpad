import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <a href="/" className="text-2xl font-bold text-foreground">
            GTMate
          </a>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              How it works
            </button>
            <button
              onClick={() => scrollToSection("expansions")}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Success stories
            </button>
            <button
              onClick={() => scrollToSection("gtm-partners")}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Become a GTM partner
            </button>
            <a
              href="mailto:contact@gtmate.com"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Contact
            </a>
            <Button asChild variant="default" size="sm">
              <a href="/apply">Get a GTM partner</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="border-t border-border py-4 md:hidden">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="text-left text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                How it works
              </button>
              <button
                onClick={() => scrollToSection("expansions")}
                className="text-left text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Success stories
              </button>
              <button
                onClick={() => scrollToSection("gtm-partners")}
                className="text-left text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Become a GTM partner
              </button>
              <a
                href="mailto:contact@gtmate.com"
                className="text-left text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Contact
              </a>
              <Button asChild variant="default" size="sm" className="w-full">
                <a href="/Apply">Get a GTM partner</a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

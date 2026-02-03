import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
      isScrolled 
        ? "border-border/20 bg-background/70 backdrop-blur-md shadow-lg" 
        : "border-transparent bg-transparent"
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex h-14 sm:h-16 items-center justify-between">
          <Link to="/" className="text-xl sm:text-2xl font-bold text-foreground tracking-tight hover:opacity-80 transition-opacity">
            GTMate
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-6 lg:gap-8 md:flex">
            <Link
              to="/become-a-partner"
              className="text-sm font-medium text-muted-foreground transition-all hover:text-foreground relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#F5DEB3] after:transition-all after:duration-300 hover:after:w-full"
            >
              Become a partner
            </Link>
            <Link
              to="/contact"
              className="text-sm font-medium text-muted-foreground transition-all hover:text-foreground relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#F5DEB3] after:transition-all after:duration-300 hover:after:w-full"
            >
              Contact
            </Link>
            <Button 
              asChild 
              size="sm"
              className="bg-white hover:bg-gray-100 text-black shadow-md hover:shadow-[#F5DEB3]/50 hover:shadow-lg transition-all duration-300 rounded-full font-semibold px-4 sm:px-6 border-2 border-transparent hover:border-[#F5DEB3]/40"
            >
              <Link to="/contact">Start Now</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 -mr-2"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            <Menu className="h-6 w-6 text-foreground" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="border-t border-border py-4 md:hidden bg-background/95 backdrop-blur-md">
            <div className="flex flex-col gap-4">
              <Link
                to="/become-a-partner"
                className="text-left text-sm text-muted-foreground transition-colors hover:text-foreground px-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Become a partner
              </Link>
              <Link
                to="/contact"
                className="text-left text-sm text-muted-foreground transition-colors hover:text-foreground px-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Button 
                asChild 
                size="sm" 
                className="w-full bg-white hover:bg-gray-100 text-black rounded-full font-semibold"
              >
                <Link to="/contact">Start Now</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

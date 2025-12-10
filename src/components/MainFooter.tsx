import { useCallback, useMemo } from "react";

const MainFooter = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = useMemo(
    () => [
      {
        title: "For companies",
        links: [
          // { label: "How it works", href: "#how-it-works" },
          // { label: "Success stories", href: "#expansions" },
          { label: "Get a GTM partner", href: "/apply" },
          { label: "Pricing", href: "/pricing" },
        ],
      },
      {
        title: "For GTM partners",
        links: [
          { label: "Become a partner", href: "/become-a-partner" },
          { label: "Partner benefits", href: "/partner-benefits" },
          { label: "Application process", href: "/apply" },
        ],
      },
      {
        title: "Resources",
        links: [
          { label: "Blog", href: "/blog" },
          { label: "Case studies", href: "/case-studies" },
          { label: "Contact us", href: "mailto:contact@gtmate.com" },
          { label: "FAQ", href: "/faq" },
        ],
      },
    ],
    []
  );

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <footer className="border-t border-border bg-secondary/20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-xl font-bold text-foreground">GTMate</h3>
            <p className="text-sm text-muted-foreground">
              Connecting companies with local GTM partners for faster, smarter
              market expansion.
            </p>
          </div>

          {footerSections.map((section, index) => (
            <div key={section.title}>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-foreground">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("#") ? (
                      <button
                        onClick={() =>
                          scrollToSection(link.href.replace("#", ""))
                        }
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} GTMate. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;

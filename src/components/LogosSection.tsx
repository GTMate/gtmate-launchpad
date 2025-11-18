const LogosSection = () => {
  const companies = [
    "TechCorp",
    "DataFlow",
    "CloudScale",
    "SalesPro",
    "MarketHub",
    "GrowthLab",
  ];

  return (
    <section className="border-t border-b border-border bg-secondary/30 py-12">
      <div className="container mx-auto px-4">
        <p className="mb-8 text-center text-sm uppercase tracking-wider text-muted-foreground">
          Trusted by leading B2B companies
        </p>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
          {companies.map((company, index) => (
            <div
              key={index}
              className="flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity"
            >
              <span className="text-lg font-semibold text-foreground">
                {company}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogosSection;

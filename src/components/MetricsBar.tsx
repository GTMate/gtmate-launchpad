const MetricsBar = () => {
  const metrics = [
    {
      number: "15+",
      label: "Target markets",
      description: "Countries where we help B2B companies win new customers.",
    },
    {
      number: "75+",
      label: "GTM partners vetted",
      description: "Sales leaders with real local experience in their markets.",
    },
    {
      number: "30 days",
      label: "Time to first deal",
      description: "We optimize for speed, not just matching.",
    },
  ];

  return (
    <section className="border-b border-border bg-secondary/30 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {metrics.map((metric, index) => (
            <div key={index} className="text-center">
              <div className="mb-2 text-4xl font-bold text-primary">
                {metric.number}
              </div>
              <div className="mb-1 text-sm font-semibold uppercase tracking-wide text-foreground">
                {metric.label}
              </div>
              <div className="text-sm text-muted-foreground">
                {metric.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetricsBar;

const MetricsBar = () => {
  const metrics = [
    {
      label: "Target markets",
      number: "15+",
    },
    {
      label: "Sellers vetted",
      number: "75+",
    },
    {
      label: "Time to first deal",
      number: "30 days",
    },
  ];

  return (
    <section className="border-b border-border bg-secondary/30 py-3">
      <div className="container mx-auto px-4">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-6 md:gap-12">
          {metrics.map((metric, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{metric.label}</span>
              <span className="text-base font-semibold text-foreground md:text-lg">
                {metric.number}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetricsBar;

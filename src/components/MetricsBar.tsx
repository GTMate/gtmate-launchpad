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
    <section className="py-1 sm:py-2 md:py-3">
      <div className="container mx-auto px-4">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-5 sm:gap-8 md:gap-10 lg:gap-16">
          {metrics.map((metric, index) => (
            <div key={index} className="flex flex-col items-center gap-0.5 sm:gap-1">
              <span className="text-2xl sm:text-3xl font-bold text-[#F5DEB3]">
                {metric.number}
              </span>
              <span className="text-xs sm:text-sm text-muted-foreground font-medium text-center">{metric.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetricsBar;

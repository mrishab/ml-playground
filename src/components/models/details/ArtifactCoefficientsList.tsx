export function ArtifactCoefficientsList({
  coefficients,
  title = "Feature Weights / Coefficients",
}: {
  coefficients: { feature: string; weight: number }[];
  title?: string;
}) {
  return (
    <div className="rounded-lg border border-border/70 p-2.5 bg-muted/10">
      <span className="text-muted-foreground block text-[11px] mb-2 font-semibold">
        {title}
      </span>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {coefficients.map((c) => (
          <div
            key={c.feature}
            className="flex justify-between border rounded p-1.5 bg-background font-mono text-[11px]"
          >
            <span className="text-muted-foreground truncate">{c.feature}</span>
            <span className="font-semibold text-foreground">{c.weight}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

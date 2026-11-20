export function TelemetrySummaryCards({
  steps,
  initialLoss,
  finalLoss,
}: {
  steps: number;
  initialLoss: number;
  finalLoss: number;
}) {
  return (
    <div className="grid grid-cols-3 gap-2">
      <div className="rounded border border-border/70 p-2 bg-muted/20">
        <span className="text-muted-foreground block text-[10px]">
          Total Steps
        </span>
        <span className="font-mono text-sm font-semibold">{steps}</span>
      </div>
      <div className="rounded border border-border/70 p-2 bg-muted/20">
        <span className="text-muted-foreground block text-[10px]">
          Initial Loss
        </span>
        <span className="font-mono text-sm font-semibold">
          {initialLoss.toFixed(4)}
        </span>
      </div>
      <div className="rounded border border-border/70 p-2 bg-muted/20">
        <span className="text-muted-foreground block text-[10px]">
          Final Loss
        </span>
        <span className="font-mono text-sm font-semibold">
          {finalLoss.toFixed(4)}
        </span>
      </div>
    </div>
  );
}

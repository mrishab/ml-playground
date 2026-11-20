export function MetricBox({ label, val }: { label: string; val: string }) {
  return (
    <div className="rounded border border-border/70 p-2 bg-muted/20">
      <span className="text-muted-foreground block text-[10px]">{label}</span>
      <span className="font-mono text-sm font-semibold">{val}</span>
    </div>
  );
}

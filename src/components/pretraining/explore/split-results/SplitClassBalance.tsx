import type { SplitStats } from "../useSplitResults";

export function SplitClassBalance({ stats }: { stats: SplitStats }) {
  if (!stats.trainClassCounts || !stats.testClassCounts) return null;

  return (
    <div className="col-span-3 rounded-md bg-muted/40 p-2.5 text-xs space-y-1.5 border border-border/60">
      <div className="font-semibold text-muted-foreground text-[11px] uppercase tracking-wider">
        Stratified Class Balance
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-muted-foreground">
        <div>
          <span className="font-medium text-foreground">Train: </span>
          {Object.entries(stats.trainClassCounts)
            .map(
              ([cls, cnt]) =>
                `${cls}: ${cnt} (${Math.round((cnt / stats.trainRows) * 100)}%)`,
            )
            .join(", ")}
        </div>
        <div>
          <span className="font-medium text-foreground">Test: </span>
          {Object.entries(stats.testClassCounts)
            .map(
              ([cls, cnt]) =>
                `${cls}: ${cnt} (${Math.round((cnt / stats.testRows) * 100)}%)`,
            )
            .join(", ")}
        </div>
      </div>
    </div>
  );
}

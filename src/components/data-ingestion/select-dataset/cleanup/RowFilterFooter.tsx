import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function RowFilterFooter({
  matchCount,
  totalCount,
  onKeep,
  onDrop,
}: {
  matchCount: number;
  totalCount: number;
  onKeep: () => void;
  onDrop: () => void;
}) {
  const isZero = matchCount === 0;
  const isAll = matchCount === totalCount;
  const keepTooltip = isZero
    ? "No rows match current filter"
    : `Keep ${matchCount} matching rows and discard ${totalCount - matchCount} rows`;
  const dropTooltip = isZero
    ? "No rows match current filter"
    : isAll
      ? "Warning: Dropping all matching rows would empty the entire dataset"
      : `Drop ${matchCount} matching rows and keep ${totalCount - matchCount} rows`;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
      <span className="text-xs text-muted-foreground">
        Matching rows: <strong className="text-foreground">{matchCount}</strong>{" "}
        / {totalCount} (
        {((matchCount / Math.max(1, totalCount)) * 100).toFixed(1)}%)
      </span>
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="default"
          onClick={onKeep}
          disabled={isZero}
          title={keepTooltip}
          className="h-8 gap-1.5 text-xs transition-[transform,background-color,border-color,color] duration-150 ease-out active:scale-[0.98]"
        >
          <Check className="h-3.5 w-3.5" /> Keep Matching
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={onDrop}
          disabled={isZero || isAll}
          title={dropTooltip}
          className="h-8 gap-1.5 text-xs text-destructive hover:bg-destructive/10 transition-[transform,background-color,border-color,color] duration-150 ease-out active:scale-[0.98]"
        >
          <X className="h-3.5 w-3.5" /> Drop Matching
        </Button>
      </div>
    </div>
  );
}

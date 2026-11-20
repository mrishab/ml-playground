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
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
      <span className="text-xs text-muted-foreground">
        Matching rows: <strong className="text-foreground">{matchCount}</strong>{" "}
        / {totalCount}
      </span>
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="default"
          onClick={onKeep}
          disabled={matchCount === 0}
          className="h-8 gap-1.5 text-xs transition-[transform,background-color,border-color,color] duration-150 ease-out active:scale-[0.98]"
        >
          <Check className="h-3.5 w-3.5" /> Keep Matching
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={onDrop}
          disabled={matchCount === 0}
          className="h-8 gap-1.5 text-xs text-destructive hover:bg-destructive/10 transition-[transform,background-color,border-color,color] duration-150 ease-out active:scale-[0.98]"
        >
          <X className="h-3.5 w-3.5" /> Drop Matching
        </Button>
      </div>
    </div>
  );
}

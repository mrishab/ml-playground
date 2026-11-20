import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function DropNullColsSection({
  threshold,
  onThresholdChange,
  onSubmit,
}: {
  threshold: number;
  onThresholdChange: (t: number) => void;
  onSubmit: () => void;
}) {
  return (
    <div className="space-y-3 p-3 rounded-lg border border-border bg-card/40">
      <h4 className="text-xs font-semibold text-foreground">
        Drop Columns by Missing %
      </h4>
      <div className="flex items-center gap-2">
        <Input
          type="number"
          min={1}
          max={100}
          className="h-9"
          value={threshold}
          onChange={(e) => onThresholdChange(Number(e.target.value))}
        />
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          % threshold
        </span>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={onSubmit}
        className="w-full h-8 text-xs text-destructive hover:bg-destructive/10 transition-[transform,background-color,border-color,color] duration-150 ease-out active:scale-[0.98]"
      >
        Drop Sparse Columns
      </Button>
    </div>
  );
}

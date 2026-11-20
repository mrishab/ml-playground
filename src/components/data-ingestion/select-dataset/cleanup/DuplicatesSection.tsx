import { Button } from "@/components/ui/button";

export function DuplicatesSection({
  duplicateCount,
  onRemoveDuplicates,
}: {
  duplicateCount: number;
  onRemoveDuplicates: () => void;
}) {
  return (
    <div className="space-y-3 p-3 rounded-lg border border-border bg-card/40">
      <h4 className="text-xs font-semibold text-foreground">Duplicate Rows</h4>
      <p className="text-xs text-muted-foreground">
        Found {duplicateCount} identical record(s) across all columns.
      </p>
      <Button
        variant="outline"
        size="sm"
        onClick={onRemoveDuplicates}
        disabled={duplicateCount === 0}
        className="w-full h-8 text-xs transition-[transform,background-color,border-color,color] duration-150 ease-out active:scale-[0.98]"
      >
        Remove {duplicateCount} Duplicate Rows
      </Button>
    </div>
  );
}

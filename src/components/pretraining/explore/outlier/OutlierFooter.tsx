import { Button } from "@/components/ui/button";
import { Undo2 } from "lucide-react";

interface OutlierFooterProps {
  totalOutliers: number;
  rowsAffected: number;
  onDrop: () => void;
  canUndo?: boolean;
  onUndo?: () => void;
}

export function OutlierFooter({
  totalOutliers,
  rowsAffected,
  onDrop,
  canUndo,
  onUndo,
}: OutlierFooterProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
      <span className="text-muted-foreground">
        Outliers: {totalOutliers} · Rows affected: {rowsAffected}
      </span>
      <div className="flex items-center gap-2">
        {canUndo && onUndo && (
          <Button
            variant="outline"
            size="sm"
            onClick={onUndo}
            className="text-xs h-8"
          >
            <Undo2 className="h-3.5 w-3.5 mr-1" />
            Undo Drop
          </Button>
        )}
        <Button
          variant="destructive"
          size="sm"
          onClick={onDrop}
          disabled={rowsAffected === 0}
        >
          Drop Outliers
        </Button>
      </div>
    </div>
  );
}

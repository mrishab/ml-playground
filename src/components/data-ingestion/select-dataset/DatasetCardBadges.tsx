import { Badge } from "@/components/ui/badge";

interface DatasetCardBadgesProps {
  isCustom?: boolean;
  problemType?: string;
  rowCount?: number;
  columnCount?: number;
  targetColumn?: string;
}

export function DatasetCardBadges({
  isCustom,
  problemType,
  rowCount,
  columnCount,
  targetColumn,
}: DatasetCardBadgesProps) {
  return (
    <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
      {isCustom && (
        <Badge
          variant="secondary"
          className="bg-success/10 text-success text-[10px] px-1.5 py-0 uppercase tracking-wider"
        >
          Uploaded
        </Badge>
      )}
      {problemType && (
        <Badge
          variant="secondary"
          className="px-1.5 py-0 text-[10px] uppercase tracking-wider"
        >
          {problemType}
        </Badge>
      )}
      {targetColumn && (
        <Badge
          variant="outline"
          className="px-1.5 py-0 text-[10px] text-primary/80 font-mono"
        >
          Y: {targetColumn}
        </Badge>
      )}
      {rowCount !== undefined && (
        <span className="text-[11px] text-muted-foreground">
          {rowCount.toLocaleString()} rows
        </span>
      )}
      {columnCount !== undefined && (
        <span className="text-[11px] text-muted-foreground">
          · {columnCount} cols
        </span>
      )}
    </div>
  );
}

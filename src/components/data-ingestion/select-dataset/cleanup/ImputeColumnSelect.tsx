import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { MissingSummary } from "@/types/dataCleanup";

export function ImputeColumnSelect({
  columns,
  missingSummary,
  selectedCol,
  onSelectCol,
}: {
  columns: string[];
  missingSummary: MissingSummary;
  selectedCol: string;
  onSelectCol: (col: string) => void;
}) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor="impute-target-col"
        className="text-xs font-medium text-muted-foreground"
      >
        Target Column
      </label>
      <Select value={selectedCol} onValueChange={onSelectCol}>
        <SelectTrigger id="impute-target-col" className="h-9">
          <SelectValue placeholder="Select column" />
        </SelectTrigger>
        <SelectContent>
          {columns.map((c) => {
            const m =
              missingSummary.byColumn.find((item) => item.column === c)
                ?.missing ?? 0;
            return (
              <SelectItem key={c} value={c}>
                {c} {m > 0 ? `(${m} nulls)` : ""}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}

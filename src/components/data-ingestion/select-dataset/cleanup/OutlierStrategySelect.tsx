import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { OutlierStrategy } from "@/types/dataCleanup";

export function OutlierStrategySelect({
  strategy,
  onStrategyChange,
}: {
  strategy: OutlierStrategy;
  onStrategyChange: (strat: OutlierStrategy) => void;
}) {
  return (
    <Select
      value={strategy}
      onValueChange={(v) => onStrategyChange(v as OutlierStrategy)}
    >
      <SelectTrigger className="h-8 text-xs">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="clip">Clip Bounds</SelectItem>
        <SelectItem value="drop">Drop Rows</SelectItem>
      </SelectContent>
    </Select>
  );
}

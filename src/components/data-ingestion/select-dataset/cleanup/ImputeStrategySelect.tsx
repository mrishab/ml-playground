import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ImputationStrategy } from "@/types/dataCleanup";

export function ImputeStrategySelect({
  strategy,
  onStrategyChange,
}: {
  strategy: ImputationStrategy;
  onStrategyChange: (s: ImputationStrategy) => void;
}) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor="impute-strategy-select"
        className="text-xs font-medium text-muted-foreground"
      >
        Strategy
      </label>
      <Select
        value={strategy}
        onValueChange={(v) => onStrategyChange(v as ImputationStrategy)}
      >
        <SelectTrigger id="impute-strategy-select" className="h-9">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="mean">Mean (Average)</SelectItem>
          <SelectItem value="median">Median (Middle value)</SelectItem>
          <SelectItem value="mode">Mode (Most frequent)</SelectItem>
          <SelectItem value="ffill">Forward Fill (ffill)</SelectItem>
          <SelectItem value="bfill">Backward Fill (bfill)</SelectItem>
          <SelectItem value="constant">Custom Constant</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

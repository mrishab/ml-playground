import { Input } from "@/components/ui/input";
import type { ImputationStrategy, MissingSummary } from "@/types/dataCleanup";
import { ImputeColumnSelect } from "./ImputeColumnSelect";
import { ImputeStrategySelect } from "./ImputeStrategySelect";

interface FormFieldsProps {
  columns: string[];
  missingSummary: MissingSummary;
  selectedCol: string;
  onSelectCol: (col: string) => void;
  strategy: ImputationStrategy;
  onStrategyChange: (s: ImputationStrategy) => void;
  constantVal: string;
  onConstantChange: (v: string) => void;
}

export function ImputeFormFields(p: FormFieldsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
      <ImputeColumnSelect
        columns={p.columns}
        missingSummary={p.missingSummary}
        selectedCol={p.selectedCol}
        onSelectCol={p.onSelectCol}
      />
      <ImputeStrategySelect
        strategy={p.strategy}
        onStrategyChange={p.onStrategyChange}
      />
      {p.strategy === "constant" && (
        <div className="space-y-1.5">
          <label
            htmlFor="impute-constant-val"
            className="text-xs font-medium text-muted-foreground"
          >
            Constant Value
          </label>
          <Input
            id="impute-constant-val"
            className="h-9"
            placeholder="Enter value..."
            value={p.constantVal}
            onChange={(e) => p.onConstantChange(e.target.value)}
          />
        </div>
      )}
    </div>
  );
}

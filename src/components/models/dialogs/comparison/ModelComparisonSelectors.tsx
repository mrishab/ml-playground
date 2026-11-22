import type { ComparisonSelectorsProps } from "./types";
import { ModelSelectDropdown } from "./ModelSelectDropdown";

export function ModelComparisonSelectors({
  models,
  modelA,
  modelB,
  modelCId,
  onSelectA,
  onSelectB,
  onSelectC,
}: ComparisonSelectorsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-2 p-3 bg-muted/20 rounded-lg border border-border/70">
      <ModelSelectDropdown
        label="Model 1 (Baseline)"
        value={modelA?.id}
        models={models}
        placeholder="Select model..."
        onSelect={onSelectA}
      />
      <ModelSelectDropdown
        label="Model 2 (Comparison)"
        value={modelB?.id}
        models={models}
        placeholder="Select model..."
        onSelect={onSelectB}
      />
      <ModelSelectDropdown
        label="Model 3 (Optional)"
        value={modelCId}
        models={models}
        placeholder="Add 3rd model..."
        hasNone
        onSelect={(val) => onSelectC(val === "none" ? "" : val)}
      />
    </div>
  );
}

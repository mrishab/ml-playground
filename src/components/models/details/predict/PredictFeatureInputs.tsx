import { PredictFeatureInputItem } from "./PredictFeatureInputItem";

interface PredictFeatureInputsProps {
  features: string[];
  analysisMap: Map<string, { mean: number; min: number; max: number }>;
  inputs: Record<string, number>;
  onInputChange: (feature: string, valStr: string) => void;
}

export function PredictFeatureInputs({
  features,
  analysisMap,
  inputs,
  onInputChange,
}: PredictFeatureInputsProps) {
  return (
    <div className="space-y-2">
      <span className="text-[11px] font-semibold text-foreground">
        Feature Inputs ({features.length} features)
      </span>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-56 overflow-y-auto pr-1">
        {features.map((feat) => (
          <PredictFeatureInputItem
            key={feat}
            feat={feat}
            stats={analysisMap.get(feat)}
            value={inputs[feat] ?? 0}
            onChange={(valStr) => onInputChange(feat, valStr)}
          />
        ))}
      </div>
    </div>
  );
}

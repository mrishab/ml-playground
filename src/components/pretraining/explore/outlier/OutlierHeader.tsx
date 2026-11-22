import { CardHeader, CardTitle } from "@/components/ui/card";
import { OutlierScaleSelector } from "./OutlierScaleSelector";
import type { OutlierScalingMode } from "./types";

const DESC: Record<OutlierScalingMode, string> = {
  standardized:
    "Features standardized to Z-scores to show low- and high-range scales together",
  normalized: "Features scaled to 0–1 range",
  raw: "Unscaled raw feature values",
};

export function OutlierHeader({
  scalingMode,
  setScalingMode,
}: {
  scalingMode: OutlierScalingMode;
  setScalingMode: (mode: OutlierScalingMode) => void;
}) {
  return (
    <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
      <div>
        <CardTitle className="text-base">Outliers (IQR Boxplot)</CardTitle>
        <p className="text-xs text-muted-foreground mt-0.5">
          {DESC[scalingMode]} ·{" "}
          <span className="text-amber-600 dark:text-amber-400 font-medium">
            Pre-split filter
          </span>
        </p>
      </div>
      <OutlierScaleSelector
        scalingMode={scalingMode}
        onSelect={setScalingMode}
      />
    </CardHeader>
  );
}

import { useState } from "react";
import Plot from "react-plotly.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useBoxPlotOptions } from "./outlier/useBoxPlotOptions";
import { OutlierIQRSlider } from "./outlier/OutlierIQRSlider";
import { OutlierFooter } from "./outlier/OutlierFooter";
import { OutlierScaleSelector } from "./outlier/OutlierScaleSelector";
import type {
  OutlierVisualizerProps,
  OutlierScalingMode,
} from "./outlier/types";

export type { OutlierVisualizerProps };

const DESC: Record<OutlierScalingMode, string> = {
  standardized:
    "Features standardized to Z-scores to show low- and high-range scales together",
  normalized: "Features scaled to 0–1 range",
  raw: "Unscaled raw feature values",
};

export function OutlierVisualizer(props: OutlierVisualizerProps) {
  const [scalingMode, setScalingMode] =
    useState<OutlierScalingMode>("standardized");
  const { data, layout, config } = useBoxPlotOptions(
    props.numericColumnData,
    scalingMode,
  );

  return (
    <Card>
      <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle className="text-base">Outliers (IQR Boxplot)</CardTitle>
          <p className="text-xs text-muted-foreground mt-0.5">
            {DESC[scalingMode]}
          </p>
        </div>
        <OutlierScaleSelector
          scalingMode={scalingMode}
          onSelect={setScalingMode}
        />
      </CardHeader>
      <CardContent className="space-y-3">
        <OutlierIQRSlider
          iqrMultiplier={props.iqrMultiplier}
          setIqrMultiplier={props.setIqrMultiplier}
        />
        <Plot
          data={data}
          layout={{ ...layout, height: 320, autosize: true }}
          config={config}
          useResizeHandler
          className="w-full"
        />
        <OutlierFooter
          totalOutliers={props.totalOutlierValues}
          rowsAffected={props.removedRowsAfterOutlierDrop}
          onDrop={props.dropOutliers}
          canUndo={props.canUndoOutliers}
          onUndo={props.undoDropOutliers}
        />
      </CardContent>
    </Card>
  );
}

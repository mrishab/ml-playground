import { useState } from "react";
import Plot from "react-plotly.js";
import { Card, CardContent } from "@/components/ui/card";
import { useBoxPlotOptions } from "./outlier/useBoxPlotOptions";
import { OutlierIQRSlider } from "./outlier/OutlierIQRSlider";
import { OutlierFooter } from "./outlier/OutlierFooter";
import { OutlierHeader } from "./outlier/OutlierHeader";
import type {
  OutlierVisualizerProps,
  OutlierScalingMode,
} from "./outlier/types";

export type { OutlierVisualizerProps };

export function OutlierVisualizer(props: OutlierVisualizerProps) {
  const [scalingMode, setScalingMode] =
    useState<OutlierScalingMode>("standardized");
  const { data, layout, config } = useBoxPlotOptions(
    props.numericColumnData,
    scalingMode,
    props.iqrMultiplier,
  );

  return (
    <Card>
      <OutlierHeader
        scalingMode={scalingMode}
        setScalingMode={setScalingMode}
      />
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

import { useMemo } from "react";
import { useTheme } from "next-themes";
import type { Data } from "plotly.js";
import type { NumericColumnData, OutlierScalingMode } from "./types";
import { buildBoxPlotTrace } from "./boxPlotTraces";
import { BOX_CONFIG, buildBoxPlotLayout } from "./boxPlotLayout";

export function useBoxPlotOptions(
  numericColumnData: NumericColumnData[],
  scalingMode: OutlierScalingMode = "standardized",
) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const data: Data[] = useMemo(
    () =>
      numericColumnData.map((col) =>
        buildBoxPlotTrace(col, scalingMode, isDark),
      ),
    [numericColumnData, scalingMode, isDark],
  );

  const yTitle =
    scalingMode === "standardized"
      ? "Z-Score (Standardized)"
      : scalingMode === "normalized"
        ? "Normalized (0 – 1)"
        : "Raw Value";

  const layout = useMemo(
    () => buildBoxPlotLayout(yTitle, isDark),
    [isDark, yTitle],
  );

  return { data, layout, config: BOX_CONFIG };
}

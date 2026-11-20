import type { Data } from "plotly.js";
import type { NumericColumnData, OutlierScalingMode } from "./types";

export function scaleBoxPlotValues(
  values: number[],
  mode: OutlierScalingMode,
): number[] {
  if (mode === "standardized") {
    const n = Math.max(1, values.length);
    const mean = values.reduce((a, b) => a + b, 0) / n;
    const variance = values.reduce((a, b) => a + (b - mean) ** 2, 0) / n;
    const std = Math.sqrt(variance) || 1;
    return values.map((v) => (v - mean) / std);
  }
  if (mode === "normalized") {
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;
    return values.map((v) => (v - min) / range);
  }
  return values;
}

export function buildBoxPlotTrace(
  col: NumericColumnData,
  mode: OutlierScalingMode,
  isDark: boolean,
): Data {
  const scaledY = scaleBoxPlotValues(col.values, mode);
  const color = isDark ? "#4fc1ff" : "#0284c7";
  const fillcolor = isDark ? "rgba(79,193,255,0.15)" : "rgba(2,132,199,0.12)";

  return {
    type: "box",
    name: col.column,
    y: scaledY,
    customdata: col.values,
    hovertemplate:
      mode === "raw"
        ? "<b>%{x}</b><br>Value: %{y:.3f}<extra></extra>"
        : "<b>%{x}</b><br>Scaled: %{y:.2f}<br>Raw: %{customdata:.3f}<extra></extra>",
    boxpoints: "outliers",
    marker: { size: 4, color },
    line: { color, width: 1.5 },
    fillcolor,
  };
}

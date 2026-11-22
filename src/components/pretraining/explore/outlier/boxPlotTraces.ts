import type { Data } from "plotly.js";
import { getQuantile } from "@/lib/stats";
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
  iqrMultiplier = 1.5,
): Data {
  void isDark;
  const scaledY = scaleBoxPlotValues(col.values, mode);
  const color = "var(--color-primary)";
  const fillcolor = "var(--color-primary)";

  if (scaledY.length === 0) {
    return {
      type: "box",
      name: col.column,
      y: [],
    };
  }

  const sorted = [...scaledY].sort((a, b) => a - b);
  const q1 = getQuantile(sorted, 0.25);
  const median = getQuantile(sorted, 0.5);
  const q3 = getQuantile(sorted, 0.75);
  const iqr = q3 - q1;
  const lowerLimit = q1 - iqrMultiplier * iqr;
  const upperLimit = q3 + iqrMultiplier * iqr;
  const inliers = sorted.filter((v) => v >= lowerLimit && v <= upperLimit);
  const lowerfence = inliers.length > 0 ? inliers[0] : q1;
  const upperfence = inliers.length > 0 ? inliers[inliers.length - 1] : q3;

  return {
    type: "box",
    name: col.column,
    x: [col.column],
    q1: [q1],
    median: [median],
    q3: [q3],
    lowerfence: [lowerfence],
    upperfence: [upperfence],
    y: [scaledY],
    customdata: [col.values],
    hovertemplate:
      mode === "raw"
        ? "<b>%{x}</b><br>Value: %{y:.3f}<extra></extra>"
        : "<b>%{x}</b><br>Scaled: %{y:.2f}<br>Raw: %{customdata:.3f}<extra></extra>",
    boxpoints: "outliers",
    marker: { size: 4, color },
    line: { color, width: 1.5 },
    fillcolor,
  } as unknown as Data;
}

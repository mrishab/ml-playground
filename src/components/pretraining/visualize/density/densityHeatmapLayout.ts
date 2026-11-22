import type { Layout } from "plotly.js";
import { getBasePlotLayout } from "../commonChartOptions";

export function getDensityHeatmapLayout(
  xLabel: string,
  yLabel: string,
  isDark: boolean,
): Partial<Layout> {
  return {
    ...getBasePlotLayout(isDark),
    xaxis: {
      title: { text: xLabel },
      gridcolor: "var(--color-border)",
    },
    yaxis: {
      title: { text: yLabel },
      gridcolor: "var(--color-border)",
    },
    margin: { t: 30, r: 20, b: 48, l: 48 },
  };
}

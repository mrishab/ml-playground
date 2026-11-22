import type { Layout } from "plotly.js";
import { getBasePlotLayout } from "../commonChartOptions";

export function buildTargetCorrelationLayout(
  targetColumn: string,
  isDark: boolean,
): Partial<Layout> {
  return {
    ...getBasePlotLayout(isDark),
    xaxis: {
      title: { text: `Pearson r vs ${targetColumn}` },
      range: [-1.05, 1.05],
      gridcolor: "var(--color-border)",
      zerolinecolor: "var(--color-border)",
    },
    yaxis: { automargin: true },
    margin: { t: 20, r: 20, b: 50, l: 80 },
    height: 380,
    autosize: true,
  };
}

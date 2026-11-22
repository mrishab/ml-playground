import { useMemo } from "react";
import type { Layout, Config } from "plotly.js";

export function useScatterPlotLayout(
  xLabel: string,
  yLabel: string,
  isDark: boolean,
): Partial<Layout> {
  return useMemo(
    () => ({
      xaxis: {
        title: { text: xLabel },
        gridcolor: "var(--color-border)",
        zerolinecolor: "var(--color-border)",
      },
      yaxis: {
        title: { text: yLabel },
        gridcolor: "var(--color-border)",
        zerolinecolor: "var(--color-border)",
      },
      margin: { t: 30, r: 16, b: 48, l: 48 },
      paper_bgcolor: "transparent",
      plot_bgcolor: "transparent",
      font: { family: "inherit", color: "var(--color-muted-foreground)" },
      hoverlabel: {
        bgcolor: "var(--color-card)",
        font: { family: "inherit", color: "var(--color-foreground)" },
        bordercolor: "var(--color-border)",
      },
      hovermode: "closest",
    }),
    [xLabel, yLabel, isDark],
  );
}

export const SCATTER_PLOT_CONFIG: Partial<Config> = {
  displayModeBar: true,
  displaylogo: false,
  modeBarButtonsToRemove: [
    "select2d",
    "lasso2d",
    "autoScale2d",
    "toggleSpikelines",
  ],
  responsive: true,
};

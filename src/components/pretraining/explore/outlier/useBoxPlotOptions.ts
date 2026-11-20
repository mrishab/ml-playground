import { useMemo } from "react";
import { useTheme } from "next-themes";
import type { Config, Data, Layout } from "plotly.js";
import type { NumericColumnData, OutlierScalingMode } from "./types";
import { buildBoxPlotTrace } from "./boxPlotTraces";

const BOX_CONFIG: Partial<Config> = {
  displaylogo: false,
  responsive: true,
  modeBarButtonsToRemove: ["select2d", "lasso2d", "autoScale2d"],
};

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

  const layout: Partial<Layout> = useMemo(
    () => ({
      margin: { t: 20, r: 10, b: 80, l: 45 },
      paper_bgcolor: "transparent",
      plot_bgcolor: "transparent",
      font: { family: "inherit", color: isDark ? "#d4d4d4" : "#334155" },
      hoverlabel: {
        bgcolor: isDark ? "#252526" : "#ffffff",
        font: { family: "inherit", color: isDark ? "#d4d4d4" : "#0f172a" },
        bordercolor: isDark ? "#383838" : "#e2e8f0",
      },
      xaxis: {
        tickangle: -30,
        gridcolor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)",
        zerolinecolor: isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)",
      },
      yaxis: {
        title: { text: yTitle },
        gridcolor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)",
        zerolinecolor: isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)",
      },
      showlegend: false,
    }),
    [isDark, yTitle],
  );

  return { data, layout, config: BOX_CONFIG };
}

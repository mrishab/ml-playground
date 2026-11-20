import type { Config, Layout } from "plotly.js";

export const BOX_CONFIG: Partial<Config> = {
  displaylogo: false,
  responsive: true,
  modeBarButtonsToRemove: ["select2d", "lasso2d", "autoScale2d"],
};

export function buildBoxPlotLayout(
  yTitle: string,
  isDark: boolean,
): Partial<Layout> {
  return {
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
  };
}

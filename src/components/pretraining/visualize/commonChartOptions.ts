import type { Layout, Config } from "plotly.js";

export function getBasePlotLayout(isDark: boolean): Partial<Layout> {
  void isDark;
  return {
    paper_bgcolor: "transparent",
    plot_bgcolor: "transparent",
    font: { family: "inherit", color: "var(--color-muted-foreground)" },
    hoverlabel: {
      bgcolor: "var(--color-card)",
      font: { family: "inherit", color: "var(--color-foreground)" },
      bordercolor: "var(--color-border)",
    },
  };
}

export const COMMON_PLOT_CONFIG: Partial<Config> = {
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

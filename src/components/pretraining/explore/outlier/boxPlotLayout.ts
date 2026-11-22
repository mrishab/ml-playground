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
  void isDark;
  return {
    margin: { t: 20, r: 10, b: 80, l: 45 },
    paper_bgcolor: "transparent",
    plot_bgcolor: "transparent",
    font: { family: "inherit", color: "var(--color-muted-foreground)" },
    hoverlabel: {
      bgcolor: "var(--color-card)",
      font: { family: "inherit", color: "var(--color-foreground)" },
      bordercolor: "var(--color-border)",
    },
    xaxis: {
      tickangle: -30,
      gridcolor: "var(--color-border)",
      zerolinecolor: "var(--color-border)",
    },
    yaxis: {
      title: { text: yTitle },
      gridcolor: "var(--color-border)",
      zerolinecolor: "var(--color-border)",
    },
    showlegend: false,
  };
}

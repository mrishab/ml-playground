import type { Layout } from "plotly.js";

export function getResidualsBaseLayout(
  xTitle: string,
  yTitle: string,
): Partial<Layout> {
  return {
    margin: { t: 20, r: 16, b: 45, l: 48 },
    paper_bgcolor: "transparent",
    plot_bgcolor: "transparent",
    font: { color: "var(--color-muted-foreground)" },
    hoverlabel: {
      bgcolor: "var(--color-card)",
      font: { family: "inherit", color: "var(--color-foreground)" },
      bordercolor: "var(--color-border)",
    },
    legend: { orientation: "h", y: -0.25 },
    height: 280,
    autosize: true,
    xaxis: {
      title: { text: xTitle },
      gridcolor: "var(--color-border)",
    },
    yaxis: {
      title: { text: yTitle },
      gridcolor: "var(--color-border)",
    },
  };
}

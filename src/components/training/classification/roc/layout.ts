import { useMemo } from "react";

export function useRocLayout(isDark: boolean): Partial<Plotly.Layout> {
  return useMemo(
    () => ({
      xaxis: {
        title: { text: "False Positive Rate (FPR)" },
        range: [0, 1],
        dtick: 0.2,
        gridcolor: "var(--color-border)",
        zerolinecolor: "var(--color-border)",
      },
      yaxis: {
        title: { text: "True Positive Rate (TPR)" },
        range: [0, 1.05],
        dtick: 0.2,
        gridcolor: "var(--color-border)",
        zerolinecolor: "var(--color-border)",
      },
      legend: { x: 0.4, y: 0.05, bgcolor: "transparent" },
      margin: { t: 20, r: 16, b: 50, l: 48 },
      paper_bgcolor: "transparent",
      plot_bgcolor: "transparent",
      font: { color: "var(--color-muted-foreground)" },
      hoverlabel: {
        bgcolor: "var(--color-card)",
        font: { family: "inherit", color: "var(--color-foreground)" },
        bordercolor: "var(--color-border)",
      },
      height: 320,
      autosize: true,
    }),
    [isDark],
  );
}

export const ROC_CONFIG: Partial<Plotly.Config> = {
  displayModeBar: false,
  responsive: true,
};

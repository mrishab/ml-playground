import type { Data } from "plotly.js";

export function buildResidualsTraces(
  predictions: number[],
  residuals: number[],
): Data[] {
  const minPred = Math.min(...predictions);
  const maxPred = Math.max(...predictions);
  const xPad = (maxPred - minPred) * 0.05 || 1;

  return [
    {
      x: [minPred - xPad, maxPred + xPad],
      y: [0, 0],
      mode: "lines",
      name: "Zero Residual (e = 0)",
      line: {
        color: "var(--color-destructive)",
        dash: "dash",
        width: 1.5,
      },
      hoverinfo: "none",
    },
    {
      x: predictions,
      y: residuals,
      mode: "markers",
      name: "Residuals",
      marker: {
        color: "var(--color-chart-4)",
        size: 7,
        opacity: 0.85,
      },
      hovertemplate:
        "Fitted (ŷ): %{x:.3f}<br>Residual (y - ŷ): %{y:.3f}<extra></extra>",
    },
  ];
}

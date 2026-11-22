import type { Data } from "plotly.js";

export function buildActualVsPredTraces(
  actuals: number[],
  predictions: number[],
): Data[] {
  const minVal = Math.min(...actuals, ...predictions);
  const maxVal = Math.max(...actuals, ...predictions);
  const pad = (maxVal - minVal) * 0.05 || 1;

  return [
    {
      x: [minVal - pad, maxVal + pad],
      y: [minVal - pad, maxVal + pad],
      mode: "lines",
      name: "Ideal (y = x)",
      line: {
        color: "var(--color-border)",
        dash: "dash",
        width: 1.5,
      },
      hoverinfo: "none",
    },
    {
      x: predictions,
      y: actuals,
      mode: "markers",
      name: "Test Observations",
      marker: {
        color: "var(--color-primary)",
        size: 7,
        opacity: 0.85,
      },
      hovertemplate: "Predicted: %{x:.3f}<br>Actual: %{y:.3f}<extra></extra>",
    },
  ];
}

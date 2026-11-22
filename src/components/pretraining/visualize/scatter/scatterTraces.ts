import type { Data } from "plotly.js";
import { calculateLinearRegressionFit } from "@/lib/bivariate/regressionFit";

const CLASS_COLORS = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
];

export function buildScatterTraces(
  x: number[],
  y: (number | string)[],
  xLabel: string,
  yLabel: string,
  problemType: string | undefined,
  isDark: boolean,
): Data[] {
  void isDark;
  const hasNonNumericY = y.some(
    (v) => typeof v === "string" && v.trim() !== "" && isNaN(Number(v.trim())),
  );

  if (problemType === "classification" || hasNonNumericY) {
    const classes = Array.from(new Set(y.map(String))).sort();
    return classes.map((cls, idx) => {
      const clsX = x.filter((_, i) => String(y[i]) === cls);
      const clsY = y.filter((val) => String(val) === cls);
      const color = CLASS_COLORS[idx % CLASS_COLORS.length];
      return {
        x: clsX,
        y: clsY,
        type: "scatter",
        mode: "markers",
        name: `${yLabel} = ${cls}`,
        marker: { color, size: 7, opacity: 0.8 },
        hovertemplate: `${xLabel}: %{x:.3f}<br>${yLabel}: ${cls}<extra></extra>`,
      };
    });
  }

  const numY = y.map((v) => {
    const num = Number(v);
    return isNaN(num) ? 0 : num;
  });
  const fit = calculateLinearRegressionFit(x, numY);
  const scatterTrace: Data = {
    x,
    y: numY,
    type: "scatter",
    mode: "markers",
    name: "Data Points",
    marker: { color: "var(--color-primary)", size: 6, opacity: 0.75 },
    hovertemplate: `${xLabel}: %{x:.3f}<br>${yLabel}: %{y:.3f}<extra></extra>`,
  };

  const trendlineTrace: Data = {
    x: fit.trendlineX,
    y: fit.trendlineY,
    type: "scatter",
    mode: "lines",
    name: `Fit: ${fit.equation} (R²=${(fit.r2 * 100).toFixed(1)}%)`,
    line: { color: "var(--color-warning)", width: 2.5 },
    hoverinfo: "name",
  };

  return [scatterTrace, trendlineTrace];
}

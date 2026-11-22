import { formatNumber } from "@/lib/number";
import { cn } from "@/lib/utils";
import type { RegressionMetrics } from "@/types/regression";
import { RegressionMetricCard, type MetricItem } from "./RegressionMetricCard";

type MetricsSummaryProps = {
  metrics: RegressionMetrics;
  direction?: "horizontal" | "vertical";
};

const getItems = (m: RegressionMetrics): MetricItem[] => [
  {
    label: "Test MSE",
    value: m.mse,
    desc:
      m.trainMse !== undefined
        ? `Train: ${formatNumber(m.trainMse)}`
        : "Mean Squared Error",
    badge: "Test Split",
  },
  {
    label: "Test RMSE",
    value: m.rmse ?? Math.sqrt(m.mse),
    desc:
      m.trainRse !== undefined
        ? `Train RSE: ${formatNumber(m.trainRse)}`
        : "Root Mean Squared Error",
    badge: "Test Split",
  },
  {
    label: "Test R²",
    value: m.rSquared,
    desc:
      m.trainRSquared !== undefined
        ? `Train: ${formatNumber(m.trainRSquared)}`
        : "Goodness of Fit",
    badge: "Test Split",
  },
];

export function MetricsSummary({
  metrics,
  direction = "horizontal",
}: MetricsSummaryProps) {
  const items = getItems(metrics);
  const layoutCls =
    direction === "horizontal" ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-1";

  return (
    <div className={cn("grid gap-4", layoutCls)}>
      {items.map((item) => (
        <RegressionMetricCard key={item.label} item={item} />
      ))}
    </div>
  );
}

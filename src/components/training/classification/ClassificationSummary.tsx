import { cn } from "@/lib/utils";
import type { ClassificationMetrics } from "@/types/classification";
import { MetricCard } from "./summary/MetricCard";

type ClassificationSummaryProps = {
  metrics: ClassificationMetrics;
  direction?: "horizontal" | "vertical";
};

export function ClassificationSummary({
  metrics,
  direction = "horizontal",
}: ClassificationSummaryProps) {
  return (
    <div
      className={cn(
        "grid gap-4",
        direction === "horizontal"
          ? "grid-cols-2 md:grid-cols-4"
          : "grid-cols-1",
      )}
    >
      <MetricCard
        label="Test Accuracy"
        value={metrics.accuracy}
        subtitle="Overall correct rate"
        format="percent"
        badge="Test Split"
      />
      <MetricCard
        label="Test Precision"
        value={metrics.weightedPrecision}
        subtitle="Weighted average"
        format="percent"
        badge="Test Split"
      />
      <MetricCard
        label="Test Recall"
        value={metrics.weightedRecall}
        subtitle="Weighted average"
        format="percent"
        badge="Test Split"
      />
      <MetricCard
        label="Test F1-Score"
        value={metrics.weightedF1}
        subtitle="Weighted average"
        format="percent"
        badge="Test Split"
      />
    </div>
  );
}

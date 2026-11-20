import { ClassificationSummary } from "@/components/training/classification/ClassificationSummary";
import { ClassificationDetailsTabs } from "@/components/training/classification/ClassificationDetailsTabs";
import { MetricsSummary } from "@/components/training/linear-regression/MetricsSummary";
import { LinearRegressionDetailsTabs } from "@/components/training/linear-regression/LinearRegressionDetailsTabs";
import type { RegressionMetrics } from "@/types/regression";
import type { ClassificationMetrics } from "@/types/classification";

export function RandomForestSummary({
  isReg,
  regressionMetrics,
  classificationMetrics,
}: {
  isReg: boolean;
  regressionMetrics?: RegressionMetrics | null;
  classificationMetrics?: ClassificationMetrics | null;
}) {
  return isReg ? (
    <MetricsSummary metrics={regressionMetrics!} />
  ) : (
    <ClassificationSummary
      metrics={classificationMetrics!}
      direction="vertical"
    />
  );
}

export function RandomForestDetails({
  isReg,
  regressionMetrics,
  classificationMetrics,
}: {
  isReg: boolean;
  regressionMetrics?: RegressionMetrics | null;
  classificationMetrics?: ClassificationMetrics | null;
}) {
  return isReg ? (
    <LinearRegressionDetailsTabs metrics={regressionMetrics!} />
  ) : (
    <ClassificationDetailsTabs metrics={classificationMetrics!} />
  );
}

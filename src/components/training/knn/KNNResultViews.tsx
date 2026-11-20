import { ClassificationSummary } from "@/components/training/classification/ClassificationSummary";
import { ClassificationDetailsTabs } from "@/components/training/classification/ClassificationDetailsTabs";
import { MetricsSummary } from "@/components/training/linear-regression/MetricsSummary";
import { LinearRegressionDetailsTabs } from "@/components/training/linear-regression/LinearRegressionDetailsTabs";
import type { ClassificationMetrics } from "@/types/classification";
import type { useKNNPage } from "./useKNNPage";

type KNNPageState = ReturnType<typeof useKNNPage>;

export function KNNSummary({ pageState }: { pageState: KNNPageState }) {
  if (pageState.isReg && pageState.regressionMetrics) {
    return (
      <MetricsSummary
        metrics={pageState.regressionMetrics}
        direction="vertical"
      />
    );
  }
  if (pageState.metrics) {
    return (
      <ClassificationSummary
        metrics={pageState.metrics as ClassificationMetrics}
        direction="vertical"
      />
    );
  }
  return null;
}

export function KNNDetails({ pageState }: { pageState: KNNPageState }) {
  if (pageState.isReg && pageState.regressionMetrics) {
    return (
      <LinearRegressionDetailsTabs metrics={pageState.regressionMetrics} />
    );
  }
  if (pageState.metrics) {
    return (
      <ClassificationDetailsTabs
        metrics={pageState.metrics as ClassificationMetrics}
      />
    );
  }
  return null;
}

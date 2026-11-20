import type { IsolationForestMetrics } from "@/types/isolationForest";
import { MetricBox } from "../MetricBox";

export function IsolationForestMetricsGrid({
  iso,
}: {
  iso: IsolationForestMetrics;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
      <MetricBox
        label="Anomalies"
        val={`${iso.anomalyCount} / ${iso.totalSamples}`}
      />
      <MetricBox
        label="Outlier Rate"
        val={`${(iso.anomalyRate * 100).toFixed(1)}%`}
      />
      <MetricBox label="Threshold" val={iso.thresholdScore.toFixed(3)} />
      <MetricBox label="Mean Score" val={iso.meanScore.toFixed(3)} />
    </div>
  );
}

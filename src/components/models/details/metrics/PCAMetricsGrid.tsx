import type { PCAMetrics } from "@/types/pca";
import { MetricBox } from "../MetricBox";

export function PCAMetricsGrid({ pca }: { pca: PCAMetrics }) {
  const pc1 = pca.components[0]?.explainedVariance ?? 0;
  const pc2 = pca.components[1]?.explainedVariance ?? 0;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
      <MetricBox
        label="Total Variance"
        val={`${(pca.totalVarianceExplained * 100).toFixed(1)}%`}
      />
      <MetricBox label="PC1 Variance" val={`${pc1}%`} />
      <MetricBox label="PC2 Variance" val={`${pc2}%`} />
      <MetricBox
        label="Kaiser Components"
        val={
          pca.kaiserComponentsCount !== null
            ? String(pca.kaiserComponentsCount)
            : "N/A (Raw Cov)"
        }
      />
    </div>
  );
}

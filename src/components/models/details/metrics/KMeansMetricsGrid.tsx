import type { KMeansMetrics } from "@/types/kmeans";
import { MetricBox } from "../MetricBox";

export function KMeansMetricsGrid({ km }: { km: KMeansMetrics }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <MetricBox label="Clusters (k)" val={String(km.k)} />
      <MetricBox label="Inertia" val={km.inertia.toFixed(2)} />
    </div>
  );
}

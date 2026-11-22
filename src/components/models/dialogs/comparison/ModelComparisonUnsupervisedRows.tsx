import type { SavedModel } from "@/types/savedModel";

export function ModelComparisonUnsupervisedRows({
  models,
}: {
  models: SavedModel[];
}) {
  const hasUnsupervised = models.some(
    (m) => m.kmeansMetrics || m.pcaMetrics || m.isolationForestMetrics,
  );
  if (!hasUnsupervised) return null;

  return (
    <tr>
      <td className="p-2 font-medium text-muted-foreground pl-4">
        Unsupervised Score
      </td>
      {models.map((m) => (
        <td key={m.id} className="p-2 font-mono">
          {m.kmeansMetrics
            ? `Inertia: ${m.kmeansMetrics.inertia.toFixed(1)} (k=${m.kmeansMetrics.k})`
            : m.pcaMetrics
              ? `Variance: ${(m.pcaMetrics.totalVarianceExplained * 100).toFixed(1)}%`
              : m.isolationForestMetrics
                ? `Anomalies: ${m.isolationForestMetrics.anomalyCount}`
                : "—"}
        </td>
      ))}
    </tr>
  );
}

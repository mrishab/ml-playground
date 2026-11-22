import type { SavedModel } from "@/types/savedModel";

export function ModelComparisonClassificationRows({
  models,
}: {
  models: SavedModel[];
}) {
  if (!models.some((m) => m.classificationMetrics)) return null;

  return (
    <>
      <tr>
        <td className="p-2 font-medium text-muted-foreground pl-4">Accuracy</td>
        {models.map((m) => (
          <td key={m.id} className="p-2 font-mono font-bold">
            {m.classificationMetrics
              ? `${(m.classificationMetrics.accuracy * 100).toFixed(1)}%`
              : "—"}
          </td>
        ))}
      </tr>
      <tr>
        <td className="p-2 font-medium text-muted-foreground pl-4">
          Weighted F1 Score
        </td>
        {models.map((m) => (
          <td key={m.id} className="p-2 font-mono">
            {m.classificationMetrics
              ? `${((m.classificationMetrics.weightedF1 ?? m.classificationMetrics.macroF1) * 100).toFixed(1)}%`
              : "—"}
          </td>
        ))}
      </tr>
      <tr>
        <td className="p-2 font-medium text-muted-foreground pl-4">
          Top ROC AUC
        </td>
        {models.map((m) => (
          <td key={m.id} className="p-2 font-mono">
            {m.classificationMetrics?.rocCurves?.[0]
              ? m.classificationMetrics.rocCurves[0].auc.toFixed(4)
              : "—"}
          </td>
        ))}
      </tr>
    </>
  );
}

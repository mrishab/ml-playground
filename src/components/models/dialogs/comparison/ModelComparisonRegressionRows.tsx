import type { SavedModel } from "@/types/savedModel";

export function ModelComparisonRegressionRows({
  models,
}: {
  models: SavedModel[];
}) {
  if (!models.some((m) => m.regressionMetrics)) return null;

  return (
    <>
      <tr>
        <td className="p-2 font-medium text-muted-foreground pl-4">
          Test R² Score
        </td>
        {models.map((m) => (
          <td key={m.id} className="p-2 font-mono font-bold">
            {m.regressionMetrics
              ? m.regressionMetrics.rSquared.toFixed(4)
              : "—"}
          </td>
        ))}
      </tr>
      <tr>
        <td className="p-2 font-medium text-muted-foreground pl-4">Test MSE</td>
        {models.map((m) => (
          <td key={m.id} className="p-2 font-mono">
            {m.regressionMetrics ? m.regressionMetrics.mse.toFixed(4) : "—"}
          </td>
        ))}
      </tr>
      <tr>
        <td className="p-2 font-medium text-muted-foreground pl-4">
          Test RMSE
        </td>
        {models.map((m) => (
          <td key={m.id} className="p-2 font-mono">
            {m.regressionMetrics
              ? (
                  m.regressionMetrics.rmse ?? Math.sqrt(m.regressionMetrics.mse)
                ).toFixed(4)
              : "—"}
          </td>
        ))}
      </tr>
      <tr>
        <td className="p-2 font-medium text-muted-foreground pl-4">
          Train RSE (df = n - p - 1)
        </td>
        {models.map((m) => (
          <td key={m.id} className="p-2 font-mono">
            {m.regressionMetrics?.trainRse !== undefined
              ? m.regressionMetrics.trainRse.toFixed(4)
              : "—"}
          </td>
        ))}
      </tr>
    </>
  );
}

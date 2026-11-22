import type { SavedModel } from "@/types/savedModel";

export interface RunDelta {
  paramChange?: string;
  metricDeltas: { label: string; text: string; positive: boolean }[];
}

export function computeRunDelta(
  curr: SavedModel,
  prev: SavedModel,
): RunDelta | null {
  const deltas: { label: string; text: string; positive: boolean }[] = [];

  // Hyperparameters diff
  let paramChange: string | undefined;
  if (curr.hyperparameters && prev.hyperparameters) {
    for (const [k, v] of Object.entries(curr.hyperparameters)) {
      if (k === "task") continue;
      const prevV = prev.hyperparameters[k];
      if (prevV !== undefined && prevV !== v) {
        paramChange = `${k}: ${prevV} → ${v}`;
        break;
      }
    }
  }

  // Regression
  if (curr.regressionMetrics && prev.regressionMetrics) {
    const dMse = curr.regressionMetrics.mse - prev.regressionMetrics.mse;
    deltas.push({
      label: "MSE",
      text: `${dMse > 0 ? "+" : ""}${dMse.toFixed(4)}`,
      positive: dMse <= 0,
    });
    const dR2 =
      curr.regressionMetrics.rSquared - prev.regressionMetrics.rSquared;
    deltas.push({
      label: "R²",
      text: `${dR2 > 0 ? "+" : ""}${dR2.toFixed(4)}`,
      positive: dR2 >= 0,
    });
  }

  // Classification
  if (curr.classificationMetrics && prev.classificationMetrics) {
    const dAcc =
      (curr.classificationMetrics.accuracy -
        prev.classificationMetrics.accuracy) *
      100;
    deltas.push({
      label: "Acc",
      text: `${dAcc > 0 ? "+" : ""}${dAcc.toFixed(1)}%`,
      positive: dAcc >= 0,
    });
  }

  // Clustering / Inertia
  if (curr.kmeansMetrics && prev.kmeansMetrics) {
    const dInertia = curr.kmeansMetrics.inertia - prev.kmeansMetrics.inertia;
    deltas.push({
      label: "Inertia",
      text: `${dInertia > 0 ? "+" : ""}${dInertia.toFixed(2)}`,
      positive: dInertia <= 0,
    });
  }

  // PCA
  if (curr.pcaMetrics && prev.pcaMetrics) {
    const dVar =
      (curr.pcaMetrics.totalVarianceExplained -
        prev.pcaMetrics.totalVarianceExplained) *
      100;
    deltas.push({
      label: "Var",
      text: `${dVar > 0 ? "+" : ""}${dVar.toFixed(1)}%`,
      positive: dVar >= 0,
    });
  }

  return deltas.length > 0 ? { paramChange, metricDeltas: deltas } : null;
}

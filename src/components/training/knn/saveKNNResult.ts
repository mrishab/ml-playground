import { saveTrainedModel } from "@/lib/models/saveTrainedModel";
import type { KNNResult } from "./trainKNN";
import type { useKNNStore } from "./useKNNStore";

export function saveKNNResult(results: KNNResult, k: number) {
  const isReg = results.kind === "regression";
  saveTrainedModel({
    algorithm: "knn",
    algorithmName: `K-Nearest Neighbors (${isReg ? "Regressor" : "Classifier"})`,
    hyperparameters: {
      k,
      distanceMetric: "Euclidean",
      task: isReg ? "Regression" : "Classification",
    },
    metrics: results.metrics,
    k,
  });
}

export function applyKNNStoreResult(
  store: ReturnType<typeof useKNNStore>,
  results: KNNResult,
) {
  if (results.kind === "regression") {
    store.setMetrics(null);
    store.setRegressionMetrics(results.metrics);
  } else {
    store.setRegressionMetrics(null);
    store.setMetrics(results.metrics);
  }
}

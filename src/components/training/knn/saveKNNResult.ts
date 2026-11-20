import { saveTrainedModel } from "@/lib/models/saveTrainedModel";
import type { KNNResult } from "./trainKNN";

export function saveKNNResult(results: KNNResult, k: number) {
  if (results.kind === "regression") {
    saveTrainedModel({
      algorithm: "knn",
      algorithmName: "K-Nearest Neighbors (Regressor)",
      hyperparameters: { k, distanceMetric: "Euclidean", task: "Regression" },
      metrics: results.metrics,
      k,
    });
  } else {
    saveTrainedModel({
      algorithm: "knn",
      algorithmName: "K-Nearest Neighbors (Classifier)",
      hyperparameters: {
        k,
        distanceMetric: "Euclidean",
        task: "Classification",
      },
      metrics: results.metrics,
      k,
    });
  }
}

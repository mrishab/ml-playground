import { useCallback } from "react";
import { createKMeansTelemetry } from "./kmeansTelemetry";
import { saveTrainedModel } from "@/lib/models/saveTrainedModel";
import { encodeNumericMatrix } from "@/lib/categoricalEncoding";
import { trainKMeans } from "./trainKMeans";
import { validateKMeansData } from "./kmeansValidation";
import type { useTrainingData } from "@/components/training/shared/useTrainingData";
import type { useKMeansStore } from "./useKMeansStore";

export function useKMeansRunner(
  data: ReturnType<typeof useTrainingData>,
  store: ReturnType<typeof useKMeansStore>,
) {
  const { k, setTrainingState, setError, setMetrics, setTelemetry } = store;

  return useCallback(async () => {
    const sourceX = data.unsupervisedX ?? data.xTrain;
    const features = data.unsupervisedFeatureNames ?? data.featureNames;
    const rawValues = sourceX ? (sourceX.values as unknown[][]) : [];
    const { encodedMatrix } = encodeNumericMatrix(rawValues);
    const err = validateKMeansData(sourceX, encodedMatrix.length, k);
    if (err) {
      setError(err);
      return;
    }
    setTrainingState("training");
    setError(null);
    setMetrics(null);
    const onStep = createKMeansTelemetry(setTelemetry);
    try {
      const results = await trainKMeans(encodedMatrix, features, k, 25, onStep);
      setMetrics(results);
      setTrainingState("complete");
      saveTrainedModel({
        algorithm: "clustering",
        algorithmName: "K-Means Clustering",
        hyperparameters: { k, maxIter: 25, initialization: "Random Partition" },
        metrics: results,
        k,
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Clustering failed");
      setTrainingState("error");
    }
  }, [
    data.xTrain,
    data.unsupervisedX,
    data.featureNames,
    data.unsupervisedFeatureNames,
    k,
    setTrainingState,
    setError,
    setMetrics,
    setTelemetry,
  ]);
}

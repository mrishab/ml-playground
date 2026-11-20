import { useCallback } from "react";
import { useTrainingData } from "@/components/training/shared/useTrainingData";
import { saveTrainedModel } from "@/lib/models/saveTrainedModel";
import { trainPCA } from "@/lib/pca/trainPCA";
import { usePCAStore } from "./usePCAStore";

export function usePCAPage() {
  const data = useTrainingData();
  const store = usePCAStore();
  const { nComponents, standardize, setTrainingState, setError, setMetrics } =
    store;

  const runTraining = useCallback(async () => {
    if (!data.xTrain || !data.featureNames || data.featureNames.length < 2) {
      setError("PCA requires at least 2 features. Please configure features.");
      return;
    }
    setTrainingState("training");
    setError(null);
    setMetrics(null);

    try {
      const rawMatrix = data.xTrain.values as unknown[][];
      const targetValues =
        data.yTrain && data.targetColumn
          ? (data.yTrain.column(data.targetColumn).values as (
              | string
              | number
            )[])
          : undefined;

      const results = trainPCA({
        rawMatrix,
        featureNames: data.featureNames,
        targetValues,
        nComponents,
        standardize,
      });

      setMetrics(results);
      setTrainingState("complete");
      saveTrainedModel({
        algorithm: "pca",
        algorithmName: "Principal Component Analysis (PCA)",
        hyperparameters: { nComponents, standardize: String(standardize) },
        metrics: results,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "PCA computation failed");
      setTrainingState("error");
    }
  }, [data, nComponents, standardize, setTrainingState, setError, setMetrics]);

  return { ...data, ...store, runTraining };
}

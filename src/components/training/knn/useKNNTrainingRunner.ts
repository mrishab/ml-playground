import { useCallback } from "react";
import type { useTrainingData } from "@/components/training/shared/useTrainingData";
import { saveKNNResult } from "./saveKNNResult";
import { trainKNN } from "./trainKNN";
import type { useKNNStore } from "./useKNNStore";

export function useKNNTrainingRunner(
  data: ReturnType<typeof useTrainingData>,
  store: ReturnType<typeof useKNNStore>,
  k: number,
  isReg: boolean,
) {
  const { setTrainingState, setError, setMetrics, setTelemetry } = store;

  return useCallback(async () => {
    const { canTrain, xTrain, xTest, yTrain, yTest, targetColumn } = data;
    if (!canTrain || !xTrain || !xTest || !yTrain || !yTest || !targetColumn) {
      setError("Missing required data. Please configure and split data first.");
      return;
    }
    setTrainingState("training");
    setError(null);
    setMetrics(null);
    store.setRegressionMetrics(null);
    setTelemetry(null);

    try {
      const task = isReg ? "regression" : "classification";
      const results = await trainKNN(
        xTrain,
        yTrain,
        xTest,
        yTest,
        targetColumn,
        k,
        task,
      );
      if (results.kind === "regression") {
        store.setMetrics(null);
        store.setRegressionMetrics(results.metrics);
      } else {
        store.setRegressionMetrics(null);
        store.setMetrics(results.metrics);
      }
      setTrainingState("complete");
      saveKNNResult(results, k);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Training failed");
      setTrainingState("error");
    }
  }, [
    data,
    isReg,
    k,
    setTrainingState,
    setError,
    setMetrics,
    setTelemetry,
    store,
  ]);
}

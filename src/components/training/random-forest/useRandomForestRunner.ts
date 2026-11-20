import { useCallback } from "react";
import { handleEnsembleResult } from "@/components/training/shared/saveEnsembleModel";
import { trainRandomForest } from "@/lib/random-forest/trainRandomForest";
import type { useTrainingData } from "@/components/training/shared/useTrainingData";
import type { useRandomForestStore } from "./useRandomForestStore";
import { createRFStepUpdater } from "./randomForestConstants";

export function useRandomForestRunner(
  data: ReturnType<typeof useTrainingData>,
  store: ReturnType<typeof useRandomForestStore>,
  setImportances: (imps: { feature: string; score: number }[]) => void,
) {
  return useCallback(async () => {
    const { canTrain, xTrain, xTest, yTrain, yTest, targetColumn } = data;
    if (!canTrain || !xTrain || !xTest || !yTrain || !yTest || !targetColumn) {
      store.setError("Missing data. Please select features and split first.");
      return;
    }
    store.setTrainingState("training");
    store.setError(null);
    store.setClassificationMetrics(null);
    store.setRegressionMetrics(null);

    const isReg = data.problemType === "regression";
    const onStep = createRFStepUpdater(
      isReg,
      store.setTelemetry,
      store.nEstimators,
    );
    const p = { nEstimators: store.nEstimators, maxDepth: store.maxDepth };

    try {
      const task = isReg ? "regression" : "classification";
      const res = await trainRandomForest(
        xTrain,
        yTrain,
        xTest,
        yTest,
        targetColumn,
        task,
        p,
        onStep,
      );
      setImportances(res.featureImportance);
      handleEnsembleResult("random-forest", "Random Forest", p, res, store);
      store.setTrainingState("complete");
    } catch (err) {
      store.setError(err instanceof Error ? err.message : "Training failed");
      store.setTrainingState("error");
    }
  }, [data, store, setImportances]);
}

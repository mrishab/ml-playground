import { useCallback } from "react";
import { handleEnsembleResult } from "@/components/training/shared/saveEnsembleModel";
import { trainXGBoost } from "@/lib/xgboost/trainXGBoost";
import type { useTrainingData } from "@/components/training/shared/useTrainingData";
import type { useXGBoostStore } from "./useXGBoostStore";
import { createXGBoostStepUpdater } from "./xgboostConstants";

export function useXGBoostRunner(
  data: ReturnType<typeof useTrainingData>,
  store: ReturnType<typeof useXGBoostStore>,
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
    const onStep = createXGBoostStepUpdater(
      isReg,
      store.setTelemetry,
      store.nEstimators,
    );
    const p = {
      nEstimators: store.nEstimators,
      maxDepth: store.maxDepth,
      learningRate: 0.1,
    };

    try {
      const task = isReg ? "regression" : "classification";
      const res = await trainXGBoost(
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
      handleEnsembleResult("xgboost", "XGBoost", p, res, store);
      store.setTrainingState("complete");
    } catch (err) {
      store.setError(err instanceof Error ? err.message : "Training failed");
      store.setTrainingState("error");
    }
  }, [data, store, setImportances]);
}

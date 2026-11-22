import { useCallback } from "react";
import { createTelemetryUpdater } from "@/components/training/shared/createTelemetryUpdater";
import { saveTrainedModel } from "@/lib/models/saveTrainedModel";
import { trainLogisticRegression } from "./trainLogisticRegression";
import type { useTrainingData } from "@/components/training/shared/useTrainingData";
import type { useLogisticRegressionStore } from "./useLogisticRegressionStore";

export function useLogisticRegressionRunner(
  data: ReturnType<typeof useTrainingData>,
  store: ReturnType<typeof useLogisticRegressionStore>,
) {
  const { setTrainingState, setError, setMetrics, setTelemetry } = store;

  return useCallback(async () => {
    const { canTrain, xTrain, xTest, yTrain, yTest, targetColumn } = data;
    if (!canTrain || !xTrain || !xTest || !yTrain || !yTest || !targetColumn) {
      setError("Missing training data. Configure and split dataset first.");
      return;
    }
    if (data.problemType === "regression") {
      setError(
        "Logistic Regression requires categorical targets. Switch to Classification.",
      );
      return;
    }
    setTrainingState("training");
    setError(null);
    setMetrics(null);
    const onStep = createTelemetryUpdater(
      "classification",
      "Cross-Entropy Loss (Log-Loss)",
      "Log-Loss",
      setTelemetry,
      "Accuracy (%)",
      "%",
    );
    try {
      const results = await trainLogisticRegression(
        xTrain,
        yTrain,
        xTest,
        yTest,
        targetColumn,
        onStep,
      );
      setMetrics(results);
      setTrainingState("complete");
      saveTrainedModel({
        algorithm: "logistic",
        algorithmName: "Logistic Regression",
        hyperparameters: { penalty: "L2", optimizer: "Adam" },
        metrics: results,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Training failed");
      setTrainingState("error");
    }
  }, [data, setTrainingState, setError, setMetrics, setTelemetry]);
}

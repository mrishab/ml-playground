import { useCallback } from "react";
import { useTrainingData } from "@/components/training/shared/useTrainingData";
import { saveTrainedModel } from "@/lib/models/saveTrainedModel";
import { trainLDA } from "./trainLDA";
import { useLDAStore } from "./useLDAStore";

export function useLDAPage() {
  const data = useTrainingData();
  const store = useLDAStore();
  const { setTrainingState, setError, setMetrics, setTelemetry } = store;

  const runTraining = useCallback(async () => {
    const { canTrain, xTrain, xTest, yTrain, yTest, targetColumn } = data;
    if (!canTrain || !xTrain || !xTest || !yTrain || !yTest || !targetColumn) {
      setError("Missing required data. Please configure and split data first.");
      return;
    }
    if (data.problemType === "regression") {
      setError(
        "Linear Discriminant Analysis (LDA) is a classification algorithm and requires categorical target classes. Please switch Problem Type to Classification or choose a regression model.",
      );
      return;
    }
    setTrainingState("training");
    setError(null);
    setMetrics(null);
    setTelemetry(null);

    try {
      const results = await trainLDA(
        xTrain,
        yTrain,
        xTest,
        yTest,
        targetColumn,
      );
      setMetrics(results);
      setTrainingState("complete");
      saveTrainedModel({
        algorithm: "lda",
        algorithmName: "Linear Discriminant Analysis",
        hyperparameters: { covariance: "Pooled (shared)", priors: "Empirical" },
        metrics: results,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Training failed");
      setTrainingState("error");
    }
  }, [data, setTrainingState, setError, setMetrics, setTelemetry]);

  return { ...data, ...store, runTraining };
}

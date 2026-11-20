import { useCallback } from "react";
import { useTrainingData } from "@/components/training/shared/useTrainingData";
import { saveTrainedModel } from "@/lib/models/saveTrainedModel";
import { trainLinearRegression } from "./trainLinearRegression";
import { useLinearRegressionStore } from "./useLinearRegressionStore";

export function useLinearRegressionPage() {
  const data = useTrainingData();
  const store = useLinearRegressionStore();
  const { setTrainingState, setError, setMetrics, setTelemetry } = store;

  const runTraining = useCallback(async () => {
    const { canTrain, xTrain, xTest, yTrain, yTest, targetColumn } = data;
    if (!canTrain || !xTrain || !xTest || !yTrain || !yTest || !targetColumn) {
      setError("Missing required data. Please configure and split data first.");
      return;
    }
    if (data.problemType === "classification") {
      setError(
        "Linear Regression (OLS) is a regression algorithm and requires continuous numeric targets. Please switch Problem Type to Regression or choose a classification model.",
      );
      return;
    }
    setTrainingState("training");
    setError(null);
    setMetrics(null);
    setTelemetry(null);

    // Yield to the event loop so the UI immediately renders the loading state
    await new Promise((resolve) => setTimeout(resolve, 0));

    try {
      const results = await trainLinearRegression(
        xTrain,
        yTrain,
        xTest,
        yTest,
        targetColumn,
      );
      setMetrics(results);
      setTrainingState("complete");
      saveTrainedModel({
        algorithm: "linear",
        algorithmName: "Linear Regression (OLS)",
        hyperparameters: { fitIntercept: true },
        metrics: results,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Training failed");
      setTrainingState("error");
    }
  }, [data, setTrainingState, setError, setMetrics, setTelemetry]);

  return { ...data, ...store, runTraining };
}

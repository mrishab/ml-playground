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
      setError("Missing training data. Configure and split dataset first.");
      return;
    }
    if (data.problemType === "classification") {
      setError(
        "OLS requires continuous numeric targets. Switch to Regression.",
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

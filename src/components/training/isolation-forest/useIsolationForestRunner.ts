import { useCallback } from "react";
import { createTelemetryUpdater } from "@/components/training/shared/createTelemetryUpdater";
import { saveTrainedModel } from "@/lib/models/saveTrainedModel";
import { trainIsolationForest } from "@/lib/isolation-forest/trainIsolationForest";
import type { useTrainingData } from "@/components/training/shared/useTrainingData";
import type { useIsolationForestStore } from "./useIsolationForestStore";

export function useIsolationForestRunner(
  data: ReturnType<typeof useTrainingData>,
  store: ReturnType<typeof useIsolationForestStore>,
) {
  return useCallback(async () => {
    const { xTrain } = data;
    if (!xTrain || xTrain.shape[0] === 0) {
      store.setError(
        "Missing feature data. Please select features and split first.",
      );
      return;
    }
    store.setTrainingState("training");
    store.setError(null);
    store.setMetrics(null);

    const onStep = createTelemetryUpdater(
      "anomaly",
      "Isolation Path Length Variance",
      "Var",
      store.setTelemetry,
      "Estimated Anomalies",
      "pts",
      store.nEstimators,
    );

    const p = {
      nEstimators: store.nEstimators,
      contamination: store.contamination,
      maxSamples: 256,
    };

    try {
      const res = await trainIsolationForest(xTrain, p, onStep);
      store.setMetrics(res);
      saveTrainedModel({
        algorithm: "isolation-forest",
        algorithmName: "Isolation Forest",
        hyperparameters: p,
        metrics: res,
      });
      store.setTrainingState("complete");
    } catch (err) {
      store.setError(err instanceof Error ? err.message : "Training failed");
      store.setTrainingState("error");
    }
  }, [data, store]);
}

import { useTrainingData } from "@/components/training/shared/useTrainingData";
import { useKNNK } from "./useKNNK";
import { useKNNStore } from "./useKNNStore";
import { useKNNTrainingRunner } from "./useKNNTrainingRunner";

export function useKNNPage() {
  const data = useTrainingData();
  const store = useKNNStore();
  const { effectiveMaxK } = useKNNK(data.xTrain);
  const isReg = data.problemType === "regression";
  const runTraining = useKNNTrainingRunner(data, store, store.k, isReg);

  const activeMetrics = isReg ? store.regressionMetrics : store.metrics;

  return {
    ...data,
    ...store,
    metrics: activeMetrics,
    isReg,
    effectiveMaxK,
    runTraining,
  };
}

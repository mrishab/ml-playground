import { useTrainingData } from "@/components/training/shared/useTrainingData";
import { useIsolationForestStore } from "./useIsolationForestStore";
import { useIsolationForestRunner } from "./useIsolationForestRunner";

export function useIsolationForestPage() {
  const data = useTrainingData();
  const store = useIsolationForestStore();
  const canTrain = Boolean(data.xTrain && data.xTrain.shape[0] > 0);
  const runTraining = useIsolationForestRunner(data, store);

  return { ...data, ...store, canTrain, runTraining };
}

import { useTrainingData } from "@/components/training/shared/useTrainingData";
import { useLogisticRegressionStore } from "./useLogisticRegressionStore";
import { useLogisticRegressionRunner } from "./useLogisticRegressionRunner";

export function useLogisticRegressionPage() {
  const data = useTrainingData();
  const store = useLogisticRegressionStore();
  const runTraining = useLogisticRegressionRunner(data, store);

  return { ...data, ...store, runTraining };
}

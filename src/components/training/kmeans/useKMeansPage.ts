import { useTrainingData } from "@/components/training/shared/useTrainingData";
import { useKMeansStore } from "./useKMeansStore";
import { useKMeansRunner } from "./useKMeansRunner";

export function useKMeansPage() {
  const data = useTrainingData();
  const store = useKMeansStore();
  const runTraining = useKMeansRunner(data, store);

  return { ...data, ...store, runTraining };
}

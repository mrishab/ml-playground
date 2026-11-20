import { useState } from "react";
import { useTrainingData } from "@/components/training/shared/useTrainingData";
import { useXGBoostStore } from "./useXGBoostStore";
import { useXGBoostRunner } from "./useXGBoostRunner";

export function useXGBoostPage() {
  const data = useTrainingData();
  const store = useXGBoostStore();
  const [importances, setImportances] = useState<
    { feature: string; score: number }[]
  >([]);

  const runTraining = useXGBoostRunner(data, store, setImportances);

  return { ...data, ...store, importances, runTraining };
}

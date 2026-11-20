import { useState } from "react";
import { useTrainingData } from "@/components/training/shared/useTrainingData";
import { useRandomForestStore } from "./useRandomForestStore";
import { useRandomForestRunner } from "./useRandomForestRunner";

export function useRandomForestPage() {
  const data = useTrainingData();
  const store = useRandomForestStore();
  const [importances, setImportances] = useState<
    { feature: string; score: number }[]
  >([]);

  const runTraining = useRandomForestRunner(data, store, setImportances);

  return { ...data, ...store, importances, runTraining };
}

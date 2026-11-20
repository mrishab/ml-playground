import type { DataFrame } from "danfojs";
import type { SavedDataset } from "@/types/savedDataset";
import { createDataFrameFromSaved } from "@/lib/datasets/dataFrameFromSaved";
import { useMLConfigStore } from "@/stores/mlConfig";

interface LoadSavedParams {
  saved: SavedDataset;
  setDf: (df: DataFrame | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  onReset: () => void;
}

export function loadSavedDataset({
  saved,
  setDf,
  setLoading,
  setError,
  onReset,
}: LoadSavedParams) {
  setError(null);
  setLoading(false);
  onReset();
  const df = createDataFrameFromSaved(saved);
  setDf(df);
  if (saved.problemType) {
    useMLConfigStore.getState().setProblemType(saved.problemType);
  }
}

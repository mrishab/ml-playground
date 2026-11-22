import { DATASETS } from "@/components/data-ingestion/select-dataset/useDatasetSelect";
import { fetchAndParseDataset } from "./fetchDataset";
import { loadDatasetConfig } from "@/lib/datasetConfig";
import { useMLConfigStore } from "@/stores/mlConfig";
import type { DataFrame } from "danfojs";
import type { ProblemType } from "@/types/dataset";

interface LoadStandardOptions {
  datasetName: string;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setDf: (df: DataFrame | null) => void;
  onReset: () => void;
}

export async function loadStandardDataset({
  datasetName,
  setLoading,
  setError,
  setDf,
  onReset,
}: LoadStandardOptions) {
  const dataset = DATASETS.find((d) => d.name === datasetName);
  if (!dataset) return;

  setLoading(true);
  setError(null);
  onReset();

  try {
    const df = await fetchAndParseDataset(dataset.file);
    setDf(df);

    // Auto-set problem type and default configuration from dataset
    if (dataset.problemType) {
      useMLConfigStore
        .getState()
        .setProblemType(dataset.problemType as ProblemType);
    }

    try {
      const config = await loadDatasetConfig(dataset.file, false);
      if (config) {
        useMLConfigStore.getState().setProblemType(config.problemType);
        useMLConfigStore.getState().setTargetColumn(config.targetColumn);
        useMLConfigStore.getState().setFeatures(config.features);
      }
    } catch {
      // Config mapping is optional enhancement
    }
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to load dataset";
    setError(message);
    setDf(null);
  } finally {
    setLoading(false);
  }
}

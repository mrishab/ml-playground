import { loadStandardDataset } from "./loadStandardDataset";
import { loadCustomDataset } from "./loadCustomDataset";
import { loadSavedDataset } from "./loadSavedDataset";
import { getSavedDatasets } from "@/lib/datasets/storage";
import type { CustomDataset } from "@/stores/dataset/types";
import type { DataFrame } from "danfojs";

interface DispatchParams {
  selectedDataset: string;
  customDatasets: CustomDataset[];
  setDf: (df: DataFrame | null) => void;
  setLoading: (l: boolean) => void;
  setError: (e: string | null) => void;
  onReset: () => void;
}

export function dispatchDatasetLoad({
  selectedDataset,
  customDatasets,
  setDf,
  setLoading,
  setError,
  onReset,
}: DispatchParams) {
  const custom = customDatasets.find((d) => d.name === selectedDataset);
  if (custom) {
    loadCustomDataset({ custom, setDf, setLoading, setError, onReset });
    return;
  }
  const saved = getSavedDatasets().find((d) => d.name === selectedDataset);
  if (saved) {
    loadSavedDataset({ saved, setDf, setLoading, setError, onReset });
    return;
  }
  loadStandardDataset({
    datasetName: selectedDataset,
    setLoading,
    setError,
    setDf,
    onReset,
  });
}

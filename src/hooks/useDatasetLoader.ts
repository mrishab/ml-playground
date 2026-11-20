import { useEffect } from "react";
import { useDatasetStore } from "@/stores/dataset";
import { useMLConfigStore } from "@/stores/mlConfig";
import { useTrainingResultsStore } from "@/stores/trainingResults";
import { dispatchDatasetLoad } from "./dispatchDatasetLoad";

export function useDatasetLoader() {
  const selectedDataset = useDatasetStore((s) => s.selectedDataset);
  const customDatasets = useDatasetStore((s) => s.customDatasets);

  useEffect(() => {
    const { setDf, setLoading, setError } = useDatasetStore.getState();
    const onReset = () => {
      useMLConfigStore.getState().reset();
      useTrainingResultsStore.getState().resetAll();
    };

    if (!selectedDataset) {
      if (useDatasetStore.getState().df !== null) {
        setDf(null);
        onReset();
      }
      return;
    }

    dispatchDatasetLoad({
      selectedDataset,
      customDatasets,
      setDf,
      setLoading,
      setError,
      onReset,
    });
  }, [selectedDataset, customDatasets]);
}

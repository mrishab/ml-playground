import { useTrainingResultsStore } from "@/stores/trainingResults";

export function usePCAStore() {
  const modelState = useTrainingResultsStore((s) => s.pca);
  const setTrainingState = useTrainingResultsStore((s) => s.setPCAState);
  const setMetrics = useTrainingResultsStore((s) => s.setPCAMetrics);
  const setError = useTrainingResultsStore((s) => s.setPCAError);
  const setNComponents = useTrainingResultsStore((s) => s.setPCANComponents);
  const setStandardize = useTrainingResultsStore((s) => s.setPCAStandardize);
  const reset = useTrainingResultsStore((s) => s.resetPCA);

  return {
    ...modelState,
    setTrainingState,
    setMetrics,
    setError,
    setNComponents,
    setStandardize,
    reset,
  };
}

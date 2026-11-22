import { useLocation } from "react-router-dom";
import { useSavedModelsStore } from "@/stores/savedModels";

export function useRegressionActiveModel() {
  const { pathname } = useLocation();
  const algSlug = pathname.split("/").pop() ?? "linear";
  return useSavedModelsStore(
    (s) =>
      s.models.find((m) => m.algorithm === algSlug) ??
      s.models.find((m) => m.problemType === "regression") ??
      s.models[0],
  );
}

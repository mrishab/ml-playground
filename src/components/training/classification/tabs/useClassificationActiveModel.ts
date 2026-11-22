import { useLocation } from "react-router-dom";
import { useSavedModelsStore } from "@/stores/savedModels";

export function useClassificationActiveModel() {
  const { pathname } = useLocation();
  const algSlug = pathname.split("/").pop() ?? "logistic";
  return useSavedModelsStore(
    (s) =>
      s.models.find((m) => m.algorithm === algSlug) ??
      s.models.find((m) => m.problemType === "classification") ??
      s.models[0],
  );
}

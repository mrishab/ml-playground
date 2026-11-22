import { useState } from "react";
import type { SavedModel } from "@/types/savedModel";

export function useModelComparison(models: SavedModel[]) {
  const [modelAId, setModelAId] = useState<string>(models[0]?.id ?? "");
  const [modelBId, setModelBId] = useState<string>(
    models[1]?.id ?? models[0]?.id ?? "",
  );
  const [modelCId, setModelCId] = useState<string>("");

  const modelA = models.find((m) => m.id === modelAId) ?? models[0];
  const modelB =
    models.find((m) => m.id === modelBId) ?? models[1] ?? models[0];
  const modelC = models.find((m) => m.id === modelCId);

  const activeModels = [modelA, modelB, modelC].filter((m): m is SavedModel =>
    Boolean(m),
  );

  return {
    modelA,
    modelB,
    modelCId,
    activeModels,
    setModelAId,
    setModelBId,
    setModelCId,
  };
}

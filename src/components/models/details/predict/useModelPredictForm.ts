import { useState, useMemo } from "react";
import type { SavedModel } from "@/types/savedModel";
import { runModelInference, type PredictionResult } from "./predictModel";

export function useModelPredictForm(model: SavedModel) {
  const features = useMemo(() => model.splitConfig.features ?? [], [model]);
  const analysisMap = useMemo(() => {
    const map = new Map<string, { mean: number; min: number; max: number }>();
    model.featureAnalysis?.forEach((f) => {
      map.set(f.feature, { mean: f.mean, min: f.min, max: f.max });
    });
    return map;
  }, [model]);

  const defaultInputs = useMemo(() => {
    const init: Record<string, number> = {};
    features.forEach((feat) => {
      const stats = analysisMap.get(feat);
      init[feat] = stats ? Number(stats.mean.toFixed(2)) : 0;
    });
    return init;
  }, [features, analysisMap]);

  const [inputs, setInputs] = useState<Record<string, number>>(defaultInputs);
  const [prediction, setPrediction] = useState<PredictionResult | null>(() =>
    runModelInference(model, defaultInputs),
  );

  const handleInputChange = (feature: string, valStr: string) => {
    const val = parseFloat(valStr);
    setInputs((prev) => ({
      ...prev,
      [feature]: isNaN(val) ? 0 : val,
    }));
  };

  const handlePredict = () => {
    setPrediction(runModelInference(model, inputs));
  };

  const handleReset = () => {
    setInputs(defaultInputs);
    setPrediction(runModelInference(model, defaultInputs));
  };

  return {
    features,
    analysisMap,
    inputs,
    prediction,
    handleInputChange,
    handlePredict,
    handleReset,
  };
}

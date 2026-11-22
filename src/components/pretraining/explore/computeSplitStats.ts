import { useMLConfigStore } from "@/stores/mlConfig";
import type { ExploreSplitHookParams } from "./exploreSplitTypes";

function countValues(vals: unknown[]): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const v of vals) {
    const k = String(v);
    counts[k] = (counts[k] ?? 0) + 1;
  }
  return counts;
}

export function computeSplitStats(p: ExploreSplitHookParams) {
  if (!p.isSplit || !p.xTrain || !p.xTest) return null;
  let trainClassCounts: Record<string, number> | undefined;
  let testClassCounts: Record<string, number> | undefined;

  if (p.problemType === "classification" && p.targetColumn) {
    const trainY = useMLConfigStore.getState().yTrain;
    const testY = useMLConfigStore.getState().yTest;
    const trainYVals = trainY?.column(p.targetColumn)?.values;
    const testYVals = testY?.column(p.targetColumn)?.values;
    if (Array.isArray(trainYVals)) {
      trainClassCounts = countValues(trainYVals);
    }
    if (Array.isArray(testYVals)) {
      testClassCounts = countValues(testYVals);
    }
  }

  return {
    trainRows: p.xTrain.shape[0],
    testRows: p.xTest.shape[0],
    featureCount: p.xTrain.shape[1],
    featureNames: p.xTrain.columns as string[],
    trainClassCounts,
    testClassCounts,
  };
}

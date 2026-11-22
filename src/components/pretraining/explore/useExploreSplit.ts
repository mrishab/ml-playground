import { useCallback, useMemo } from "react";
import { usePipelineStore } from "@/stores/pipeline";
import { executeDataSplit } from "./splitLogic";
import { computeSplitStats } from "./computeSplitStats";
import type { ExploreSplitHookParams } from "./exploreSplitTypes";

export function useExploreSplit(p: ExploreSplitHookParams) {
  const canSplit = useMemo(() => {
    return Boolean(
      p.df &&
        p.targetColumn !== "" &&
        p.selectedFeatures.length > 0 &&
        !p.selectedFeatures.some((f) => f.column === p.targetColumn),
    );
  }, [p.df, p.targetColumn, p.selectedFeatures]);

  const performSplit = useCallback(() => {
    if (!p.df || !canSplit) return;
    p.resetTrainingResults();
    const splitResult = executeDataSplit({
      df: p.df,
      shuffle: p.shuffle,
      stratified: p.stratified,
      testSplitPercent: p.testSplitPercent,
      selectedFeatures: p.selectedFeatures,
      targetColumn: p.targetColumn,
      problemType: p.problemType,
      randomSeed: p.randomSeed,
    });
    p.setSplitData(splitResult);
    usePipelineStore.getState().recordSplit({
      datasetName: p.selectedDataset,
      problemType: p.problemType,
      targetColumn: p.targetColumn,
      selectedFeatures: p.selectedFeatures,
      testSplitPercent: p.testSplitPercent,
      shuffle: p.shuffle,
    });
  }, [p, canSplit]);

  const splitStats = useMemo(
    () => computeSplitStats(p),
    [p.isSplit, p.xTrain, p.xTest, p.problemType, p.targetColumn],
  );

  return { canSplit, performSplit, splitStats };
}

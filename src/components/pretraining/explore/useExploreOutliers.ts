import { useCallback, useState } from "react";
import { filterOutlierDf } from "./outlierDetection";
import type { OutlierParams } from "./outlierBounds";
import { useOutlierCalculations } from "./useOutlierCalculations";

export function useExploreOutliers({
  df,
  numericColumns,
  setDf,
  clearSplitData,
  resetTrainingResults,
}: OutlierParams) {
  const [iqrMultiplier, setIqrMultiplier] = useState(1.5);
  const { numericColumnData, totalOutlierValues, outlierRows } =
    useOutlierCalculations(df, numericColumns, iqrMultiplier);

  const [previousDf, setPreviousDf] = useState<typeof df | null>(null);

  const dropOutliers = useCallback(() => {
    if (!df || outlierRows.outlier.length === 0) return;
    setPreviousDf(df);
    setDf(filterOutlierDf(df, outlierRows.inlier));
    clearSplitData();
    resetTrainingResults();
  }, [clearSplitData, df, outlierRows, resetTrainingResults, setDf]);

  const undoDropOutliers = useCallback(() => {
    if (!previousDf) return;
    setDf(previousDf);
    setPreviousDf(null);
    clearSplitData();
    resetTrainingResults();
  }, [clearSplitData, previousDf, resetTrainingResults, setDf]);

  return {
    iqrMultiplier,
    setIqrMultiplier,
    numericColumnData,
    totalOutlierValues,
    removedRowsAfterOutlierDrop: outlierRows.outlier.length,
    dropOutliers,
    canUndoOutliers: Boolean(previousDf),
    undoDropOutliers,
  };
}

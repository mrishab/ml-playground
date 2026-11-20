import { useMemo } from "react";
import type { DataFrame } from "danfojs";
import {
  computeColumnOutliers,
  partitionOutlierRows,
} from "./outlierDetection";
import { buildOutlierBounds, sumOutliers } from "./outlierBounds";

export function useOutlierCalculations(
  df: DataFrame | null,
  numericColumns: string[],
  iqrMultiplier: number,
) {
  const numericColumnData = useMemo(
    () => (df ? computeColumnOutliers(df, numericColumns, iqrMultiplier) : []),
    [df, numericColumns, iqrMultiplier],
  );

  const totalOutlierValues = useMemo(
    () => sumOutliers(numericColumnData),
    [numericColumnData],
  );

  const outlierBounds = useMemo(
    () => buildOutlierBounds(numericColumnData),
    [numericColumnData],
  );

  const outlierRows = useMemo(() => {
    if (!df || numericColumns.length === 0) return { outlier: [], inlier: [] };
    return partitionOutlierRows(df, numericColumns, outlierBounds);
  }, [df, numericColumns, outlierBounds]);

  return { numericColumnData, totalOutlierValues, outlierRows };
}

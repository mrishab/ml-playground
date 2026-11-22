import { useCallback } from "react";
import type { OutlierStrategy, RowFilter } from "@/types/dataCleanup";
import { dropDuplicateRows } from "@/lib/data-cleanup/duplicateOps";
import {
  handleOutliers,
  computeColumnIQR,
} from "@/lib/data-cleanup/outlierOps";
import { applyRowFilter } from "@/lib/data-cleanup/filterOps";

interface RowActionParams {
  columns: string[];
  values: unknown[][];
  onApply: (newVals: unknown[][], newCols: string[], desc: string) => void;
}

export function useRowActions({ columns, values, onApply }: RowActionParams) {
  const handleRemoveDuplicates = useCallback(() => {
    const nextVals = dropDuplicateRows(values);
    const removed = values.length - nextVals.length;
    onApply(nextVals, columns, `Removed ${removed} duplicate row(s)`);
  }, [columns, values, onApply]);

  const handleOutlierAction = useCallback(
    (col: string, strat: OutlierStrategy) => {
      const idx = columns.indexOf(col);
      if (idx === -1) return;
      const { count, lower, upper } = computeColumnIQR(values, idx);
      const nextVals = handleOutliers(values, idx, strat);
      const droppedRows = values.length - nextVals.length;
      const desc =
        strat === "clip"
          ? count > 0
            ? `Clipped ${count} outlier value(s) in "${col}" to [${Number(lower.toFixed(2))}, ${Number(upper.toFixed(2))}]`
            : `Checked "${col}": 0 outliers outside IQR bounds`
          : `Dropped ${droppedRows} outlier row(s) in "${col}"`;
      onApply(nextVals, columns, desc);
    },
    [columns, values, onApply],
  );

  const handleFilter = useCallback(
    (filter: RowFilter, keep: boolean) => {
      const nextVals = applyRowFilter(columns, values, filter, keep);
      const affected = values.length - nextVals.length;
      onApply(
        nextVals,
        columns,
        `${keep ? "Filtered to" : "Dropped"} rows where ${filter.column} ${filter.operator} "${filter.value}" (-${affected} rows)`,
      );
    },
    [columns, values, onApply],
  );

  return { handleRemoveDuplicates, handleOutlierAction, handleFilter };
}

import { useCallback } from "react";
import type { ImputationStrategy } from "@/types/dataCleanup";
import { imputeColumn } from "@/lib/data-cleanup/imputeOps";

export function useImputeAction(
  columns: string[],
  values: unknown[][],
  onApply: (newVals: unknown[][], newCols: string[], desc: string) => void,
) {
  return useCallback(
    (col: string, strategy: ImputationStrategy, constVal?: unknown) => {
      const idx = columns.indexOf(col);
      if (idx === -1) return;
      const nextVals = imputeColumn(values, idx, strategy, constVal);
      onApply(
        nextVals,
        columns,
        `Imputed missing values in "${col}" using ${strategy}`,
      );
    },
    [columns, values, onApply],
  );
}

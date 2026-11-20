import { useCallback } from "react";
import { replaceValue } from "@/lib/data-cleanup/columnOps";
import type { ColumnActionParams } from "./columnOpsTypes";

export function useColumnReplaceAction({
  columns,
  values,
  onApply,
}: ColumnActionParams) {
  return useCallback(
    (col: string, findVal: string, replaceVal: string) => {
      const idx = columns.indexOf(col);
      if (idx === -1) return;
      onApply(
        replaceValue(values, idx, findVal, replaceVal),
        columns,
        `Replaced "${findVal}" with "${replaceVal}" in "${col}"`,
      );
    },
    [columns, values, onApply],
  );
}

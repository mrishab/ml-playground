import { useCallback } from "react";
import {
  renameColumn,
  castColumnType,
  replaceValue,
  labelEncodeColumn,
  oneHotEncodeColumn,
} from "@/lib/data-cleanup/columnOps";
import { dropSpecificColumn } from "@/lib/data-cleanup/dropNullOps";
import type { ColumnActionParams } from "./columnOpsTypes";

export function useColumnActions({
  columns,
  values,
  onApply,
}: ColumnActionParams) {
  const handleRename = useCallback(
    (oldName: string, newName: string) => {
      onApply(
        values,
        renameColumn(columns, oldName, newName),
        `Renamed column "${oldName}" to "${newName}"`,
      );
    },
    [columns, values, onApply],
  );

  const handleDropCol = useCallback(
    (col: string) => {
      const idx = columns.indexOf(col);
      if (idx === -1) return;
      const res = dropSpecificColumn(columns, values, idx);
      onApply(res.values, res.columns, `Dropped column "${col}"`);
    },
    [columns, values, onApply],
  );

  const handleCast = useCallback(
    (col: string, targetType: "numeric" | "string" | "boolean") => {
      const idx = columns.indexOf(col);
      if (idx === -1) return;
      onApply(
        castColumnType(values, idx, targetType),
        columns,
        `Cast column "${col}" to ${targetType}`,
      );
    },
    [columns, values, onApply],
  );

  const handleLabelEncode = useCallback(
    (col: string) => {
      const idx = columns.indexOf(col);
      if (idx === -1) return;
      onApply(
        labelEncodeColumn(values, idx),
        columns,
        `Label-encoded column "${col}"`,
      );
    },
    [columns, values, onApply],
  );

  const handleOneHotEncode = useCallback(
    (col: string) => {
      const idx = columns.indexOf(col);
      if (idx === -1) return;
      const { newColumns, newValues } = oneHotEncodeColumn(
        columns,
        values,
        idx,
      );
      onApply(newValues, newColumns, `One-hot encoded column "${col}"`);
    },
    [columns, values, onApply],
  );

  const handleReplaceValue = useCallback(
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

  return {
    handleRename,
    handleDropCol,
    handleCast,
    handleLabelEncode,
    handleOneHotEncode,
    handleReplaceValue,
  };
}

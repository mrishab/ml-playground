import { useCallback } from "react";
import {
  castColumnType,
  labelEncodeColumn,
  oneHotEncodeColumn,
} from "@/lib/data-cleanup/columnOps";
import type { ColumnActionParams } from "./columnOpsTypes";
import { useColumnReplaceAction } from "./useColumnReplaceAction";

export function useColumnEncodingActions(params: ColumnActionParams) {
  const { columns, values, onApply } = params;
  const handleReplaceValue = useColumnReplaceAction(params);

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

  return {
    handleCast,
    handleLabelEncode,
    handleOneHotEncode,
    handleReplaceValue,
  };
}

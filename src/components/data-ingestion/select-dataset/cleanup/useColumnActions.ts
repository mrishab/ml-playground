import { useCallback } from "react";
import { renameColumn } from "@/lib/data-cleanup/columnOps";
import { dropSpecificColumn } from "@/lib/data-cleanup/dropNullOps";
import type { ColumnActionParams } from "./columnOpsTypes";
import { useColumnEncodingActions } from "./useColumnEncodingActions";

export function useColumnActions({
  columns,
  values,
  onApply,
}: ColumnActionParams) {
  const encodingActions = useColumnEncodingActions({
    columns,
    values,
    onApply,
  });

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

  return {
    handleRename,
    handleDropCol,
    ...encodingActions,
  };
}

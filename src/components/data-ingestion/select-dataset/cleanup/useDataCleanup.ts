import { useCallback } from "react";
import { useDatasetStore } from "@/stores/dataset";
import { useCleanupState } from "./useCleanupState";
import { useCleanupDataExtract } from "./useCleanupDataExtract";
import { useApplyTransformation } from "./useApplyTransformation";
import { useCleanupActionHandlers } from "./useCleanupActionHandlers";
import { useCleanupHistoryActions } from "./useCleanupHistoryActions";

export function useDataCleanup() {
  const df = useDatasetStore((s) => s.df);
  const { originalDf, undoStack, setUndoStack, history, setHistory } =
    useCleanupState(df);
  const dataExtract = useCleanupDataExtract(df);
  const { applyTransformation, setDf } = useApplyTransformation(df);

  const onApply = useCallback(
    (newVals: unknown[][], newCols: string[], desc: string) => {
      applyTransformation({
        newValues: newVals,
        newColumns: newCols,
        description: desc,
        undoStack,
        setUndoStack,
        setHistory,
      });
    },
    [applyTransformation, undoStack, setUndoStack, setHistory],
  );

  const actions = useCleanupActionHandlers({
    columns: dataExtract.columns,
    values: dataExtract.values,
    onApply,
  });

  const { handleUndo, handleReset } = useCleanupHistoryActions({
    originalDf,
    undoStack,
    setUndoStack,
    setHistory,
    setDf,
  });

  return {
    ...dataExtract,
    ...actions,
    history,
    canUndo: undoStack.length > 0,
    handleUndo,
    handleReset,
  };
}

import { useCallback } from "react";
import type { DataFrame } from "danfojs";
import type { CleanupHistoryEntry } from "@/types/dataCleanup";

export function useCleanupHistoryActions({
  originalDf,
  undoStack,
  setUndoStack,
  setHistory,
  setDf,
}: {
  originalDf: DataFrame | null;
  undoStack: DataFrame[];
  setUndoStack: React.Dispatch<React.SetStateAction<DataFrame[]>>;
  setHistory: React.Dispatch<React.SetStateAction<CleanupHistoryEntry[]>>;
  setDf: (df: DataFrame | null) => void;
}) {
  const handleUndo = useCallback(() => {
    if (undoStack.length === 0) return;
    const prev = undoStack[undoStack.length - 1];
    setUndoStack((s) => s.slice(0, -1));
    setHistory((h) => h.slice(1));
    setDf(prev);
  }, [undoStack, setUndoStack, setHistory, setDf]);

  const handleReset = useCallback(() => {
    if (!originalDf) return;
    setUndoStack([]);
    setHistory([]);
    setDf(originalDf);
  }, [originalDf, setUndoStack, setHistory, setDf]);

  return { handleUndo, handleReset };
}

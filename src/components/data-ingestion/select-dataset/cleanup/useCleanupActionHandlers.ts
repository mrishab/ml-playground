import { useNullActions } from "./useNullActions";
import { useRowActions } from "./useRowActions";
import { useColumnActions } from "./useColumnActions";

export function useCleanupActionHandlers({
  columns,
  values,
  onApply,
}: {
  columns: string[];
  values: unknown[][];
  onApply: (newVals: unknown[][], newCols: string[], desc: string) => void;
}) {
  const nullActions = useNullActions({ columns, values, onApply });
  const rowActions = useRowActions({ columns, values, onApply });
  const colActions = useColumnActions({ columns, values, onApply });

  return { ...nullActions, ...rowActions, ...colActions };
}

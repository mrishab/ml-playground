import type { ColumnTargetType, ColumnOpsFormState } from "./useColumnOpsForm";

export interface ColumnOpsCardProps {
  columns: string[];
  onRename: (oldName: string, newName: string) => void;
  onDropCol: (col: string) => void;
  onCast: (col: string, type: "numeric" | "string" | "boolean") => void;
  onLabelEncode?: (col: string) => void;
  onOneHotEncode?: (col: string) => void;
  onReplace: (col: string, findVal: string, replaceVal: string) => void;
}

export interface CastReplaceProps {
  columns: string[];
  selectedCol: string;
  onSelectCol: (col: string) => void;
  targetType: ColumnTargetType;
  onTargetTypeChange: (val: ColumnTargetType) => void;
  findVal: string;
  onFindChange: (val: string) => void;
  replaceVal: string;
  onReplaceChange: (val: string) => void;
  onCast: () => void;
  onReplace: () => void;
}

export interface UseColumnOpsHandlersParams extends ColumnOpsCardProps {
  form: ColumnOpsFormState;
}

export interface ColumnActionParams {
  columns: string[];
  values: unknown[][];
  onApply: (newVals: unknown[][], newCols: string[], desc: string) => void;
}

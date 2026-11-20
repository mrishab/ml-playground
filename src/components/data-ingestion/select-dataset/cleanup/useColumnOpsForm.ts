import { useState, useEffect } from "react";

export type ColumnTargetType =
  | "numeric"
  | "string"
  | "boolean"
  | "label"
  | "one-hot";

export function useColumnOpsForm(columns: string[]) {
  const [selectedCol, setSelectedCol] = useState<string>(columns[0] || "");
  const [newName, setNewName] = useState<string>("");
  const [targetType, setTargetType] = useState<ColumnTargetType>("numeric");
  const [findVal, setFindVal] = useState<string>("");
  const [replaceVal, setReplaceVal] = useState<string>("");

  useEffect(() => {
    if (!columns.includes(selectedCol)) {
      setSelectedCol(columns[0] || "");
    }
  }, [columns, selectedCol]);

  return {
    selectedCol,
    setSelectedCol,
    newName,
    setNewName,
    targetType,
    setTargetType,
    findVal,
    setFindVal,
    replaceVal,
    setReplaceVal,
  };
}

export type ColumnOpsFormState = ReturnType<typeof useColumnOpsForm>;

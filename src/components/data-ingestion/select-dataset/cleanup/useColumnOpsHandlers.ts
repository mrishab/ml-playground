import type { UseColumnOpsHandlersParams } from "./columnOpsTypes";

export function useColumnOpsHandlers({
  form,
  columns,
  onRename,
  onDropCol,
  onCast,
  onLabelEncode,
  onOneHotEncode,
  onReplace,
}: UseColumnOpsHandlersParams) {
  const handleRename = () => {
    if (form.selectedCol && form.newName) {
      const cleanNew = form.newName.trim();
      onRename(form.selectedCol, cleanNew);
      form.setNewName("");
      form.setSelectedCol(cleanNew);
    }
  };

  const handleDrop = () => {
    if (form.selectedCol) {
      const colToDrop = form.selectedCol;
      const remaining = columns.filter((c) => c !== colToDrop);
      onDropCol(colToDrop);
      form.setNewName("");
      form.setSelectedCol(remaining[0] || "");
    }
  };

  const handleCastAction = () => {
    if (!form.selectedCol) return;
    if (form.targetType === "label") {
      onLabelEncode?.(form.selectedCol);
    } else if (form.targetType === "one-hot") {
      onOneHotEncode?.(form.selectedCol);
    } else {
      onCast(form.selectedCol, form.targetType);
    }
  };

  const handleReplaceAction = () => {
    if (form.selectedCol) {
      onReplace(form.selectedCol, form.findVal, form.replaceVal);
    }
  };

  return { handleRename, handleDrop, handleCastAction, handleReplaceAction };
}

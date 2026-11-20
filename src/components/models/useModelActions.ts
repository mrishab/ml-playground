import { useCallback } from "react";
import type { SavedModelsStore } from "@/stores/savedModels";
import type { useModelDialogs } from "./useModelDialogs";
import {
  downloadModelJSON,
  downloadAllModelsBundle,
} from "@/lib/models/exportImport";
import type { SavedModel } from "@/types/savedModel";

export function useModelActions(
  store: SavedModelsStore,
  dialogs: ReturnType<typeof useModelDialogs>,
) {
  const handleDownload = useCallback(
    (model: SavedModel) => downloadModelJSON(model),
    [],
  );

  const handleDownloadAll = useCallback(
    () => downloadAllModelsBundle(store.models),
    [store.models],
  );

  const handleDelete = useCallback(
    (id: string) => {
      store.deleteModel(id);
      dialogs.setDeleteTarget(null);
    },
    [store, dialogs],
  );

  const handleRename = useCallback(
    (id: string, name: string) => {
      store.renameModel(id, name);
      dialogs.setRenameTarget(null);
    },
    [store, dialogs],
  );

  const handleClearAll = useCallback(() => {
    store.clearAll();
    dialogs.setIsClearOpen(false);
  }, [store, dialogs]);

  return {
    handleDownload,
    handleDownloadAll,
    handleDelete,
    handleRename,
    handleClearAll,
  };
}

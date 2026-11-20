import { useMemo, useEffect } from "react";
import { useSavedModelsStore } from "@/stores/savedModels";
import { filterAndSortModels } from "./filterModels";
import { useModelDialogs } from "./useModelDialogs";
import { useModelActions } from "./useModelActions";
import { syncActiveTrainingIfUnsaved } from "@/lib/models/syncActiveTraining";

export function useModelsPage() {
  const store = useSavedModelsStore();
  const dialogs = useModelDialogs();
  const actions = useModelActions(store, dialogs);

  useEffect(() => {
    syncActiveTrainingIfUnsaved();
  }, []);

  const filteredModels = useMemo(
    () =>
      filterAndSortModels(
        store.models,
        store.searchQuery,
        store.filterType,
        store.sortBy,
      ),
    [store.models, store.searchQuery, store.filterType, store.sortBy],
  );

  return {
    models: store.models,
    filteredModels,
    formattedSize: store.formattedSize,
    totalBytes: store.totalBytes,
    searchQuery: store.searchQuery,
    setSearchQuery: store.setSearchQuery,
    filterType: store.filterType,
    setFilterType: store.setFilterType,
    sortBy: store.sortBy,
    setSortBy: store.setSortBy,
    dialogs,
    ...actions,
    handleImport: store.importModels,
  };
}

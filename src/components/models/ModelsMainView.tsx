import type { useModelsPage } from "./useModelsPage";
import { ModelsEmptyState } from "./ModelsEmptyState";
import { ModelsListGrid } from "./ModelsListGrid";

export function ModelsMainView({ p }: { p: ReturnType<typeof useModelsPage> }) {
  if (p.filteredModels.length === 0) {
    return (
      <ModelsEmptyState
        isFiltered={p.models.length > 0}
        onResetFilters={() => {
          p.setSearchQuery("");
          p.setFilterType("all");
        }}
      />
    );
  }

  return (
    <ModelsListGrid
      models={p.filteredModels}
      onInspect={(m) => p.dialogs.setSelectedModel(m)}
      onDownload={p.handleDownload}
      onRename={(m) => p.dialogs.setRenameTarget(m)}
      onDelete={(m) => p.dialogs.setDeleteTarget(m)}
    />
  );
}

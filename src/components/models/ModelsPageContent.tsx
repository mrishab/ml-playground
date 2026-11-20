import type { useModelsPage } from "./useModelsPage";
import { ModelsPageHeader } from "./ModelsPageHeader";
import { ModelsStorageBanner } from "./ModelsStorageBanner";
import { ModelsFilterBar } from "./ModelsFilterBar";
import { ModelsMainView } from "./ModelsMainView";
import { ModelsDialogs } from "./ModelsDialogs";

export function ModelsPageContent({
  p,
}: {
  p: ReturnType<typeof useModelsPage>;
}) {
  return (
    <div className="flex flex-1 flex-col gap-5 p-3.5 sm:p-5 md:p-6 pb-8 max-w-7xl mx-auto w-full">
      <ModelsPageHeader
        modelCount={p.models.length}
        onImportClick={() => p.dialogs.setIsImportOpen(true)}
        onDownloadAllClick={p.handleDownloadAll}
        onClearAllClick={() => p.dialogs.setIsClearOpen(true)}
      />
      <ModelsStorageBanner formattedSize={p.formattedSize} models={p.models} />
      <ModelsFilterBar
        searchQuery={p.searchQuery}
        onSearchChange={p.setSearchQuery}
        filterType={p.filterType}
        onFilterChange={p.setFilterType}
        sortBy={p.sortBy}
        onSortChange={p.setSortBy}
      />
      <ModelsMainView p={p} />
      <ModelsDialogs
        dialogs={p.dialogs}
        onDownload={p.handleDownload}
        onRename={p.handleRename}
        onDelete={p.handleDelete}
        onClear={p.handleClearAll}
        onImport={p.handleImport}
        modelsCount={p.models.length}
      />
    </div>
  );
}

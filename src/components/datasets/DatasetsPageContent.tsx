import type { useDatasetsPage } from "./useDatasetsPage";
import { DatasetsPageHeader } from "./DatasetsPageHeader";
import { DatasetsStorageBanner } from "./DatasetsStorageBanner";
import { DatasetsFilterBar } from "./DatasetsFilterBar";
import { DatasetsMainView } from "./DatasetsMainView";
import { DatasetsDialogs } from "./DatasetsDialogs";
import { downloadAllDatasetsAsJSON } from "@/lib/datasets/exportImport";

export function DatasetsPageContent({
  p,
}: {
  p: ReturnType<typeof useDatasetsPage>;
}) {
  return (
    <div className="flex flex-1 flex-col gap-5 p-3.5 sm:p-5 md:p-6 pb-8 max-w-7xl mx-auto w-full">
      <DatasetsPageHeader
        datasetCount={p.datasets.length}
        onImportClick={() => p.dialogs.setIsImportOpen(true)}
        onDownloadAllClick={() => downloadAllDatasetsAsJSON(p.datasets)}
        onClearAllClick={() => p.dialogs.setIsClearOpen(true)}
      />
      <DatasetsStorageBanner
        formattedSize={p.formattedSize}
        datasets={p.datasets}
      />
      <DatasetsFilterBar
        searchQuery={p.searchQuery}
        onSearchChange={p.setSearchQuery}
        filterSource={p.filterSource}
        onFilterChange={p.setFilterSource}
        sortBy={p.sortBy}
        onSortChange={p.setSortBy}
      />
      <DatasetsMainView p={p} />
      <DatasetsDialogs page={p} />
    </div>
  );
}

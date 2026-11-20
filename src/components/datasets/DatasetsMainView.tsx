import type { useDatasetsPage } from "./useDatasetsPage";
import { DatasetsEmptyState } from "./DatasetsEmptyState";
import { DatasetsListGrid } from "./DatasetsListGrid";
import {
  downloadDataAsCSV,
  downloadDatasetAsJSON,
} from "@/lib/datasets/exportImport";

export function DatasetsMainView({
  p,
}: {
  p: ReturnType<typeof useDatasetsPage>;
}) {
  if (p.filteredDatasets.length === 0) {
    return (
      <DatasetsEmptyState
        isFiltered={p.datasets.length > 0}
        onResetFilters={() => {
          p.setSearchQuery("");
          p.setFilterSource("all");
        }}
      />
    );
  }

  return (
    <DatasetsListGrid
      datasets={p.filteredDatasets}
      onLoadInPipeline={p.handleLoadInPipeline}
      onInspect={(d) => p.dialogs.setInspectDataset(d)}
      onDownloadCSV={(d) => downloadDataAsCSV(d.name, d.columns, d.data)}
      onDownloadJSON={downloadDatasetAsJSON}
      onRename={(d) => p.dialogs.setRenameDataset(d)}
      onDelete={(d) => p.dialogs.setDeleteDataset(d)}
    />
  );
}

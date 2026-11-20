import { DatasetRenameDialog } from "./DatasetRenameDialog";
import { DatasetDeleteConfirmDialog } from "./DatasetDeleteConfirmDialog";
import { DatasetClearConfirmDialog } from "./DatasetClearConfirmDialog";
import { DatasetImportDialog } from "./DatasetImportDialog";
import type { useDatasetsPage } from "../useDatasetsPage";

export function DatasetMutationDialogs({
  page,
}: {
  page: ReturnType<typeof useDatasetsPage>;
}) {
  const {
    dialogs,
    renameDataset,
    deleteDataset,
    clearAll,
    importDatasets,
    datasets,
  } = page;

  return (
    <>
      <DatasetRenameDialog
        dataset={dialogs.renameDataset}
        onClose={() => dialogs.setRenameDataset(null)}
        onConfirm={(id, name) => {
          renameDataset(id, name);
          dialogs.setRenameDataset(null);
        }}
      />
      <DatasetDeleteConfirmDialog
        dataset={dialogs.deleteDataset}
        onClose={() => dialogs.setDeleteDataset(null)}
        onConfirm={(id) => {
          deleteDataset(id);
          dialogs.setDeleteDataset(null);
        }}
      />
      <DatasetClearConfirmDialog
        open={dialogs.isClearOpen}
        onClose={() => dialogs.setIsClearOpen(false)}
        onConfirm={() => {
          clearAll();
          dialogs.setIsClearOpen(false);
        }}
        count={datasets.length}
      />
      <DatasetImportDialog
        open={dialogs.isImportOpen}
        onClose={() => dialogs.setIsImportOpen(false)}
        onImport={importDatasets}
      />
    </>
  );
}

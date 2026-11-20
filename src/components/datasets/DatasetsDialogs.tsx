import { DatasetInspectModal } from "./details/DatasetInspectModal";
import { DatasetMutationDialogs } from "./dialogs/DatasetMutationDialogs";
import type { useDatasetsPage } from "./useDatasetsPage";
import { downloadDataAsCSV } from "@/lib/data-cleanup/csvExport";
import type { SavedDataset } from "@/types/savedDataset";

interface DialogsProps {
  page: ReturnType<typeof useDatasetsPage>;
}

export function DatasetsDialogs({ page }: DialogsProps) {
  const { dialogs, handleLoadInPipeline } = page;

  return (
    <>
      <DatasetInspectModal
        dataset={dialogs.inspectDataset}
        onClose={() => dialogs.setInspectDataset(null)}
        onLoadInPipeline={handleLoadInPipeline}
        onDownloadCSV={(d: SavedDataset) =>
          downloadDataAsCSV(d.name, d.columns, d.data)
        }
      />
      <DatasetMutationDialogs page={page} />
    </>
  );
}

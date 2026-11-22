import { Badge } from "@/components/ui/badge";
import { useDatasetStore } from "@/stores/dataset";
import { useViewerHeaderActions } from "./useViewerHeaderActions";
import { SaveDatasetModal } from "./cleanup/SaveDatasetModal";
import { DatasetViewerActions } from "./DatasetViewerActions";

interface DatasetViewerHeaderProps {
  selectedDataset: string | null;
  rowCount: number;
  colCount: number;
}

export function DatasetViewerHeader({
  selectedDataset,
  rowCount,
  colCount,
}: DatasetViewerHeaderProps) {
  const isCustom = useDatasetStore((s) =>
    s.customDatasets.some((d) => d.name === selectedDataset),
  );
  const {
    saveModalOpen,
    setSaveModalOpen,
    handleDownload,
    handleNavigateManage,
  } = useViewerHeaderActions();

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 pb-2">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-muted-foreground">
          Loaded: <strong className="text-foreground">{selectedDataset}</strong>{" "}
          ({rowCount} rows, {colCount} cols)
        </span>
        {isCustom && (
          <Badge
            variant="secondary"
            className="text-[10px] px-1.5 py-0 bg-success/10 text-success font-medium"
          >
            Custom
          </Badge>
        )}
      </div>
      <DatasetViewerActions
        onSave={() => setSaveModalOpen(true)}
        onDownload={handleDownload}
        onNavigateManage={handleNavigateManage}
      />
      <SaveDatasetModal open={saveModalOpen} onOpenChange={setSaveModalOpen} />
    </div>
  );
}

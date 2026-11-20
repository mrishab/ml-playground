import { Database } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { DatasetInspectTabs } from "./DatasetInspectTabs";
import { DatasetInspectFooter } from "./DatasetInspectFooter";
import type { SavedDataset } from "@/types/savedDataset";

interface InspectModalProps {
  dataset: SavedDataset | null;
  onClose: () => void;
  onLoadInPipeline: (d: SavedDataset) => void;
  onDownloadCSV: (d: SavedDataset) => void;
}

export function DatasetInspectModal({
  dataset,
  onClose,
  onLoadInPipeline,
  onDownloadCSV,
}: InspectModalProps) {
  if (!dataset) return null;

  return (
    <Dialog open={Boolean(dataset)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-2xl max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-primary" /> {dataset.name}
          </DialogTitle>
          <DialogDescription>
            {dataset.rowCount.toLocaleString()} rows • {dataset.columnCount}{" "}
            columns • {dataset.source}
          </DialogDescription>
        </DialogHeader>
        <DatasetInspectTabs dataset={dataset} />
        <DatasetInspectFooter
          dataset={dataset}
          onClose={onClose}
          onLoadInPipeline={onLoadInPipeline}
          onDownloadCSV={onDownloadCSV}
        />
      </DialogContent>
    </Dialog>
  );
}

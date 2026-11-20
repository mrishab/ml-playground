import { Play, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import type { SavedDataset } from "@/types/savedDataset";

export function DatasetInspectFooter({
  dataset,
  onClose,
  onLoadInPipeline,
  onDownloadCSV,
}: {
  dataset: SavedDataset;
  onClose: () => void;
  onLoadInPipeline: (d: SavedDataset) => void;
  onDownloadCSV: (d: SavedDataset) => void;
}) {
  return (
    <DialogFooter className="flex sm:justify-between items-center gap-2 pt-2 border-t border-border">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onDownloadCSV(dataset)}
        className="h-8 gap-1.5 text-xs"
      >
        <Download className="h-3.5 w-3.5" /> Export CSV
      </Button>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="h-8 text-xs"
        >
          Close
        </Button>
        <Button
          size="sm"
          onClick={() => {
            onLoadInPipeline(dataset);
            onClose();
          }}
          className="h-8 gap-1.5 text-xs active:scale-[0.98]"
        >
          <Play className="h-3.5 w-3.5" /> Load in Pipeline
        </Button>
      </div>
    </DialogFooter>
  );
}

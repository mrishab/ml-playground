import { Play, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SavedDataset } from "@/types/savedDataset";
import { DatasetItemUtilityButtons } from "./DatasetItemUtilityButtons";

interface ActionsProps {
  dataset: SavedDataset;
  onLoadInPipeline: (d: SavedDataset) => void;
  onInspect: (d: SavedDataset) => void;
  onDownloadCSV: (d: SavedDataset) => void;
  onDownloadJSON: (d: SavedDataset) => void;
  onRename: (d: SavedDataset) => void;
  onDelete: (d: SavedDataset) => void;
}

export function DatasetItemCardActions(p: ActionsProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-1.5 pt-1">
      <div className="flex items-center gap-1.5">
        <Button
          size="sm"
          onClick={() => p.onLoadInPipeline(p.dataset)}
          className="h-7 text-xs font-medium gap-1 active:scale-[0.98]"
        >
          <Play className="h-3 w-3" /> Load
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => p.onInspect(p.dataset)}
          className="h-7 text-xs font-medium gap-1 active:scale-[0.98]"
        >
          <Eye className="h-3 w-3" /> Inspect
        </Button>
      </div>

      <DatasetItemUtilityButtons
        dataset={p.dataset}
        onDownloadCSV={p.onDownloadCSV}
        onDownloadJSON={p.onDownloadJSON}
        onRename={p.onRename}
        onDelete={p.onDelete}
      />
    </div>
  );
}

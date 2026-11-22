import { Download, Pencil, Trash2, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SavedDataset } from "@/types/savedDataset";

export function DatasetItemUtilityButtons({
  dataset,
  onDownloadCSV,
  onDownloadJSON,
  onRename,
  onDelete,
}: {
  dataset: SavedDataset;
  onDownloadCSV: (d: SavedDataset) => void;
  onDownloadJSON: (d: SavedDataset) => void;
  onRename: (d: SavedDataset) => void;
  onDelete: (d: SavedDataset) => void;
}) {
  return (
    <div className="flex items-center gap-1">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onDownloadCSV(dataset)}
        title="Download CSV"
        className="h-7 px-2 text-xs active:scale-[0.98]"
      >
        <FileSpreadsheet className="h-3.5 w-3.5 text-success" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onDownloadJSON(dataset)}
        title="Download JSON"
        className="h-7 px-2 text-xs active:scale-[0.98]"
      >
        <Download className="h-3.5 w-3.5" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onRename(dataset)}
        title="Rename Dataset"
        className="h-7 px-2 text-xs active:scale-[0.98]"
      >
        <Pencil className="h-3.5 w-3.5" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onDelete(dataset)}
        title="Delete Dataset"
        className="h-7 px-2 text-xs text-destructive hover:bg-destructive/10 active:scale-[0.98]"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
}

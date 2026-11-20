import { Download, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SavedModel } from "@/types/savedModel";

export function ModelCardUtilityButtons({
  model,
  onDownload,
  onRename,
  onDelete,
}: {
  model: SavedModel;
  onDownload: (m: SavedModel) => void;
  onRename: (m: SavedModel) => void;
  onDelete: (m: SavedModel) => void;
}) {
  return (
    <div className="flex items-center gap-1">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onDownload(model)}
        title="Download model JSON"
        className="h-8 px-2 text-xs active:scale-[0.98]"
      >
        <Download className="h-3.5 w-3.5" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onRename(model)}
        title="Rename model"
        className="h-8 px-2 text-xs active:scale-[0.98]"
      >
        <Pencil className="h-3.5 w-3.5" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onDelete(model)}
        title="Delete model"
        className="h-8 px-2 text-xs text-destructive hover:bg-destructive/10 active:scale-[0.98]"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
}

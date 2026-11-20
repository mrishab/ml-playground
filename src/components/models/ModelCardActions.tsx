import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SavedModel } from "@/types/savedModel";
import { ModelCardUtilityButtons } from "./ModelCardUtilityButtons";

interface ActionsProps {
  model: SavedModel;
  onInspect: (m: SavedModel) => void;
  onDownload: (m: SavedModel) => void;
  onRename: (m: SavedModel) => void;
  onDelete: (m: SavedModel) => void;
}

export function ModelCardActions({
  model,
  onInspect,
  onDownload,
  onRename,
  onDelete,
}: ActionsProps) {
  return (
    <div className="flex items-center justify-between border-t border-border/60 pt-2.5 mt-1">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onInspect(model)}
        className="h-8 text-xs font-medium active:scale-[0.98]"
      >
        <Eye className="mr-1.5 h-3.5 w-3.5" />
        Inspect
      </Button>

      <ModelCardUtilityButtons
        model={model}
        onDownload={onDownload}
        onRename={onRename}
        onDelete={onDelete}
      />
    </div>
  );
}

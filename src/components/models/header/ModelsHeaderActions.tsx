import { Button } from "@/components/ui/button";
import { Download, Upload, Trash2, GitCompare } from "lucide-react";
import type { ModelsHeaderProps } from "./modelsHeaderTypes";

export function ModelsHeaderActions(p: ModelsHeaderProps) {
  return (
    <div className="flex items-center gap-2">
      {p.modelCount >= 2 && p.onCompareClick && (
        <Button
          variant="outline"
          size="sm"
          onClick={p.onCompareClick}
          className="active:scale-[0.98] border-primary/40 text-primary hover:bg-primary/10 transition-[transform,background-color,border-color,color] duration-150 ease-out"
        >
          <GitCompare className="mr-1.5 h-3.5 w-3.5" />
          Compare Models
        </Button>
      )}
      <Button
        variant="outline"
        size="sm"
        onClick={p.onImportClick}
        className="active:scale-[0.98] transition-[transform,background-color,border-color,color] duration-150 ease-out"
      >
        <Upload className="mr-1.5 h-3.5 w-3.5" />
        Import Model
      </Button>
      {p.modelCount > 0 && (
        <>
          <Button
            variant="outline"
            size="sm"
            onClick={p.onDownloadAllClick}
            className="active:scale-[0.98] transition-[transform,background-color,border-color,color] duration-150 ease-out"
          >
            <Download className="mr-1.5 h-3.5 w-3.5" />
            Download All
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={p.onClearAllClick}
            className="text-destructive hover:bg-destructive/10 active:scale-[0.98] transition-[transform,background-color,border-color,color] duration-150 ease-out"
          >
            <Trash2 className="mr-1.5 h-3.5 w-3.5" />
            Clear All
          </Button>
        </>
      )}
    </div>
  );
}

import { Download, Save, FolderKanban } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DatasetViewerActions({
  onSave,
  onDownload,
  onNavigateManage,
}: {
  onSave: () => void;
  onDownload: () => void;
  onNavigateManage: () => void;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <Button
        variant="outline"
        size="sm"
        onClick={onSave}
        className="h-7 text-xs gap-1.5 transition-[transform,background-color,border-color,color] duration-150 ease-out active:scale-[0.98]"
      >
        <Save className="h-3.5 w-3.5" /> Save
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={onDownload}
        className="h-7 text-xs gap-1.5 transition-[transform,background-color,border-color,color] duration-150 ease-out active:scale-[0.98]"
      >
        <Download className="h-3.5 w-3.5" /> Export CSV
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={onNavigateManage}
        className="h-7 text-xs gap-1.5 text-muted-foreground transition-[transform,background-color,border-color,color] duration-150 ease-out active:scale-[0.98]"
      >
        <FolderKanban className="h-3.5 w-3.5" /> Datasets
      </Button>
    </div>
  );
}

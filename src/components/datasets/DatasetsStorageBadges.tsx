import { Database, Sparkles, UploadCloud } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { SavedDataset } from "@/types/savedDataset";

export function DatasetsStorageBadges({
  datasets,
}: {
  datasets: SavedDataset[];
}) {
  const cleanedCount = datasets.filter((d) => d.source === "cleaned").length;
  const uploadedCount = datasets.filter((d) => d.source === "uploaded").length;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge
        variant="secondary"
        className="flex items-center gap-1.5 font-normal"
      >
        <Database className="h-3 w-3" />
        {datasets.length} {datasets.length === 1 ? "Dataset" : "Datasets"}
      </Badge>
      {cleanedCount > 0 && (
        <Badge variant="outline" className="flex items-center gap-1">
          <Sparkles className="h-3 w-3 text-primary" />
          {cleanedCount} Cleaned
        </Badge>
      )}
      {uploadedCount > 0 && (
        <Badge variant="outline" className="flex items-center gap-1">
          <UploadCloud className="h-3 w-3 text-emerald-500" />
          {uploadedCount} Uploaded
        </Badge>
      )}
    </div>
  );
}

import { Database } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { SavedModel } from "@/types/savedModel";

export function ModelsStorageBadges({ models }: { models: SavedModel[] }) {
  const regCount = models.filter((m) => m.problemType === "regression").length;
  const clsCount = models.filter(
    (m) => m.problemType === "classification",
  ).length;
  const clusterCount = models.filter(
    (m) => m.problemType === "clustering",
  ).length;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge
        variant="secondary"
        className="flex items-center gap-1.5 font-normal"
      >
        <Database className="h-3 w-3" />
        {models.length} {models.length === 1 ? "Model" : "Models"}
      </Badge>
      {regCount > 0 && <Badge variant="outline">{regCount} Regression</Badge>}
      {clsCount > 0 && (
        <Badge variant="outline">{clsCount} Classification</Badge>
      )}
      {clusterCount > 0 && (
        <Badge variant="outline">{clusterCount} Clustering</Badge>
      )}
    </div>
  );
}

import { Badge } from "@/components/ui/badge";
import type { SavedModel } from "@/types/savedModel";
import { ModelOverviewMetaGrid } from "./ModelOverviewMetaGrid";

export function ModelOverviewTab({ model }: { model: SavedModel }) {
  const hpEntries = Object.entries(model.hyperparameters);
  const showTarget =
    model.algorithm !== "clustering" &&
    model.algorithm !== "isolation-forest" &&
    model.algorithm !== "pca" &&
    Boolean(model.splitConfig.targetColumn);

  return (
    <div className="flex flex-col gap-4 py-2 text-xs">
      <ModelOverviewMetaGrid model={model} />

      {showTarget && (
        <div className="rounded-lg border border-border/70 p-2.5 bg-muted/10">
          <span className="text-muted-foreground block text-[11px] mb-1">
            Target Column
          </span>
          <Badge variant="secondary" className="font-mono text-xs">
            {model.splitConfig.targetColumn}
          </Badge>
        </div>
      )}

      {hpEntries.length > 0 && (
        <div className="rounded-lg border border-border/70 p-2.5 bg-muted/10">
          <span className="text-muted-foreground block text-[11px] mb-1.5">
            Hyperparameters
          </span>
          <div className="flex flex-wrap gap-1.5">
            {hpEntries.map(([k, v]) => (
              <Badge
                key={k}
                variant="outline"
                className="font-mono text-[11px]"
              >
                {k}: {String(v)}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

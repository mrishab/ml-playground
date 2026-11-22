import { useLocation } from "react-router-dom";
import { GitCompare } from "lucide-react";
import { useSavedModelsStore } from "@/stores/savedModels";
import { cn } from "@/lib/utils";
import { computeRunDelta } from "./previousRunDelta";

export function PreviousRunDeltaBadge() {
  const { pathname } = useLocation();
  const slug = pathname.split("/").pop() ?? "";
  const models = useSavedModelsStore((s) => s.models);

  const curr = models.find((m) => m.algorithm === slug);
  if (!curr) return null;

  const prev = models.find(
    (m) =>
      m.id !== curr.id &&
      m.algorithm === slug &&
      m.datasetName === curr.datasetName,
  );
  if (!prev) return null;

  const delta = computeRunDelta(curr, prev);
  if (!delta) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-lg border border-border/80 bg-muted/30 px-3 py-2 text-xs">
      <span className="font-semibold text-muted-foreground flex items-center gap-1.5">
        <GitCompare className="h-3.5 w-3.5 text-primary" />
        Previous Run Delta
        {delta.paramChange && (
          <span className="font-mono text-[11px] text-foreground">
            ({delta.paramChange})
          </span>
        )}
        :
      </span>
      {delta.metricDeltas.map((d) => (
        <span
          key={d.label}
          className={cn(
            "font-mono px-1.5 py-0.5 rounded text-[11px] font-semibold",
            d.positive
              ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
              : "bg-amber-500/15 text-amber-700 dark:text-amber-300",
          )}
        >
          Δ {d.label} {d.text}
        </span>
      ))}
    </div>
  );
}

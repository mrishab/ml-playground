import type { SavedModel } from "@/types/savedModel";

export function ModelOverviewMetaGrid({ model }: { model: SavedModel }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
      <div className="rounded-lg border border-border/70 p-2.5 bg-muted/20">
        <span className="text-muted-foreground block text-[11px]">
          Problem Type
        </span>
        <span className="font-semibold text-foreground capitalize">
          {model.problemType}
        </span>
      </div>
      <div className="rounded-lg border border-border/70 p-2.5 bg-muted/20">
        <span className="text-muted-foreground block text-[11px]">Dataset</span>
        <span className="font-semibold text-foreground truncate block">
          {model.datasetName}
        </span>
      </div>
      <div className="rounded-lg border border-border/70 p-2.5 bg-muted/20">
        <span className="text-muted-foreground block text-[11px]">
          Train / Test
        </span>
        <span className="font-semibold text-foreground font-mono">
          {model.splitConfig.trainSamples} / {model.splitConfig.testSamples}
        </span>
      </div>
      <div className="rounded-lg border border-border/70 p-2.5 bg-muted/20">
        <span className="text-muted-foreground block text-[11px]">
          Split Ratio
        </span>
        <span className="font-semibold text-foreground font-mono">
          {100 - model.splitConfig.testSplitPercent}% /{" "}
          {model.splitConfig.testSplitPercent}%
        </span>
      </div>
    </div>
  );
}

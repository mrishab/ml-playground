import { cn } from "@/lib/utils";
import type { OutlierScalingMode } from "./types";

interface OutlierScaleSelectorProps {
  scalingMode: OutlierScalingMode;
  onSelect: (mode: OutlierScalingMode) => void;
}

const MODES: { id: OutlierScalingMode; label: string }[] = [
  { id: "standardized", label: "Z-Score" },
  { id: "normalized", label: "0–1" },
  { id: "raw", label: "Raw" },
];

export function OutlierScaleSelector({
  scalingMode,
  onSelect,
}: OutlierScaleSelectorProps) {
  return (
    <div className="flex items-center gap-1 bg-muted/50 p-1 rounded-md border border-border/60 text-xs">
      {MODES.map((m) => (
        <button
          key={m.id}
          type="button"
          onClick={() => onSelect(m.id)}
          className={cn(
            "px-2 py-0.5 rounded transition-all font-medium",
            scalingMode === m.id
              ? "bg-background text-foreground shadow-xs font-semibold"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {m.label}
        </button>
      ))}
    </div>
  );
}

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PredictFeatureInputItemProps {
  feat: string;
  stats?: { mean: number; min: number; max: number };
  value: number;
  onChange: (valStr: string) => void;
}

export function PredictFeatureInputItem({
  feat,
  stats,
  value,
  onChange,
}: PredictFeatureInputItemProps) {
  return (
    <div className="rounded border border-border/70 p-2 bg-muted/20 space-y-1">
      <div className="flex items-center justify-between">
        <Label
          htmlFor={`predict-${feat}`}
          className="text-[11px] font-mono truncate max-w-[130px]"
          title={feat}
        >
          {feat}
        </Label>
        {stats && (
          <span className="text-[10px] text-muted-foreground font-mono">
            μ = {stats.mean.toFixed(1)}
          </span>
        )}
      </div>
      <Input
        id={`predict-${feat}`}
        type="number"
        step="any"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-7 text-xs font-mono"
      />
      {stats && (
        <p className="text-[9px] text-muted-foreground truncate">
          Range: [{stats.min.toFixed(1)}, {stats.max.toFixed(1)}]
        </p>
      )}
    </div>
  );
}

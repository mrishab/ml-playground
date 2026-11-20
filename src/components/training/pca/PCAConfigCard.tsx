import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import type { PCAConfigCardProps } from "./pcaConfigTypes";

export function PCAConfigCard({
  nComponents,
  onNComponentsChange,
  standardize,
  onStandardizeChange,
  maxComponents,
  disabled,
}: PCAConfigCardProps) {
  const maxK = Math.max(1, Math.min(10, maxComponents || 5));

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">
          PCA Parameters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-xs">Number of Components (k)</Label>
            <span className="font-mono text-xs font-semibold">
              {nComponents}
            </span>
          </div>
          <Slider
            min={1}
            max={maxK}
            step={1}
            value={[nComponents]}
            onValueChange={([val]) => onNComponentsChange(val)}
            disabled={disabled}
          />
        </div>
        <div className="flex items-center justify-between border-t pt-3">
          <div>
            <Label htmlFor="standardize-switch" className="text-xs">
              Standardize (Z-Score)
            </Label>
            <p className="text-[11px] text-muted-foreground">
              Mean 0, variance 1 scaling
            </p>
          </div>
          <Switch
            id="standardize-switch"
            checked={standardize}
            onCheckedChange={onStandardizeChange}
            disabled={disabled}
          />
        </div>
      </CardContent>
    </Card>
  );
}

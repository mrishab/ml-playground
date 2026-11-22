import { Sliders } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function StandardizeFeaturesToggle({
  standardizeFeatures,
  setStandardizeFeatures,
}: {
  standardizeFeatures?: boolean;
  setStandardizeFeatures?: (val: boolean) => void;
}) {
  if (!setStandardizeFeatures) return null;

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Sliders className="h-4 w-4 text-muted-foreground" />
        <div>
          <Label htmlFor="standardize-features">
            Standardize Features (Train only)
          </Label>
          <p className="text-[11px] text-muted-foreground">
            Z-score scaling fit strictly on train split (KNN / Logistic / LDA)
          </p>
        </div>
      </div>
      <Switch
        id="standardize-features"
        checked={standardizeFeatures ?? true}
        onCheckedChange={setStandardizeFeatures}
      />
    </div>
  );
}

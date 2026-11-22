import { Layers } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function StratifiedToggle({
  problemType,
  stratified,
  setStratified,
}: {
  problemType: string;
  stratified?: boolean;
  setStratified?: (val: boolean) => void;
}) {
  if (problemType !== "classification" || !setStratified) return null;

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Layers className="h-4 w-4 text-muted-foreground" />
        <div>
          <Label htmlFor="stratified">Stratified split</Label>
          <p className="text-[11px] text-muted-foreground">
            Preserve target class balance across train/test
          </p>
        </div>
      </div>
      <Switch
        id="stratified"
        checked={stratified ?? true}
        onCheckedChange={setStratified}
      />
    </div>
  );
}

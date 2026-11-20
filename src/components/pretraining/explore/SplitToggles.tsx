import { Shuffle as ShuffleIcon, Layers } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface SplitTogglesProps {
  shuffle: boolean;
  setShuffle: (val: boolean) => void;
  problemType: string;
  stratified?: boolean;
  setStratified?: (val: boolean) => void;
}

export function SplitToggles({
  shuffle,
  setShuffle,
  problemType,
  stratified,
  setStratified,
}: SplitTogglesProps) {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShuffleIcon className="h-4 w-4 text-muted-foreground" />
          <Label htmlFor="shuffle">Shuffle data</Label>
        </div>
        <Switch id="shuffle" checked={shuffle} onCheckedChange={setShuffle} />
      </div>
      {problemType === "classification" && setStratified && (
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
      )}
    </>
  );
}

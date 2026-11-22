import { Shuffle as ShuffleIcon, Hash } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";

export function ShuffleSeedToggle({
  shuffle,
  setShuffle,
  randomSeed,
  setRandomSeed,
}: {
  shuffle: boolean;
  setShuffle: (val: boolean) => void;
  randomSeed?: number;
  setRandomSeed?: (val: number | undefined) => void;
}) {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShuffleIcon className="h-4 w-4 text-muted-foreground" />
          <Label htmlFor="shuffle">Shuffle data</Label>
        </div>
        <Switch id="shuffle" checked={shuffle} onCheckedChange={setShuffle} />
      </div>

      {shuffle && setRandomSeed && (
        <div className="flex items-center justify-between pl-6 text-xs">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Hash className="h-3.5 w-3.5" />
            <Label htmlFor="random-seed" className="text-xs">
              Random Seed (optional)
            </Label>
          </div>
          <Input
            id="random-seed"
            type="number"
            placeholder="e.g. 42"
            value={randomSeed ?? ""}
            onChange={(e) =>
              setRandomSeed(
                e.target.value === ""
                  ? undefined
                  : parseInt(e.target.value, 10),
              )
            }
            className="h-7 w-24 text-xs font-mono"
          />
        </div>
      )}
    </>
  );
}

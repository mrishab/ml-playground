import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ColumnFindReplaceSection({
  findVal,
  onFindChange,
  replaceVal,
  onReplaceChange,
  onReplace,
}: {
  findVal: string;
  onFindChange: (v: string) => void;
  replaceVal: string;
  onReplaceChange: (v: string) => void;
  onReplace: () => void;
}) {
  return (
    <div className="space-y-2 pt-1 border-t border-border">
      <div className="grid grid-cols-2 gap-2">
        <Input
          className="h-8 text-xs"
          placeholder="Find..."
          value={findVal}
          onChange={(e) => onFindChange(e.target.value)}
        />
        <Input
          className="h-8 text-xs"
          placeholder="Replace with..."
          value={replaceVal}
          onChange={(e) => onReplaceChange(e.target.value)}
        />
      </div>
      <Button
        size="sm"
        variant="outline"
        onClick={onReplace}
        disabled={!findVal}
        className="w-full h-7 text-xs active:scale-[0.98]"
      >
        <RefreshCw className="h-3 w-3 mr-1" /> Replace Values
      </Button>
    </div>
  );
}

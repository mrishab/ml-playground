import { Sparkles, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CastTargetTypeSelect } from "./CastTargetTypeSelect";
import type { CastReplaceProps } from "./columnOpsTypes";

export function ColumnCastReplaceSection({
  columns,
  selectedCol,
  onSelectCol,
  targetType,
  onTargetTypeChange,
  findVal,
  onFindChange,
  replaceVal,
  onReplaceChange,
  onCast,
  onReplace,
}: CastReplaceProps) {
  const getButtonLabel = () => {
    if (targetType === "label") return "Apply Label Encoding (0..K-1)";
    if (targetType === "one-hot") return "Apply One-Hot Encoding";
    return `Cast to ${targetType}`;
  };

  return (
    <div className="space-y-3 p-3 rounded-lg border border-border bg-card/40">
      <h4 className="text-xs font-semibold text-foreground">
        Type Cast &amp; Find / Replace
      </h4>
      <div className="grid grid-cols-2 gap-2">
        <Select value={selectedCol} onValueChange={onSelectCol}>
          <SelectTrigger className="h-8 text-xs">
            <SelectValue placeholder="Column" />
          </SelectTrigger>
          <SelectContent>
            {columns.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <CastTargetTypeSelect
          value={targetType}
          onChange={onTargetTypeChange}
        />
      </div>
      <Button
        size="sm"
        variant="secondary"
        onClick={onCast}
        className="w-full h-7 text-xs transition-[transform,background-color,border-color,color] duration-150 ease-out active:scale-[0.98]"
      >
        <Sparkles className="h-3 w-3 mr-1" /> {getButtonLabel()}
      </Button>
      <div className="grid grid-cols-2 gap-2 pt-1 border-t border-border">
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
        className="w-full h-7 text-xs transition-[transform,background-color,border-color,color] duration-150 ease-out active:scale-[0.98]"
      >
        <RefreshCw className="h-3 w-3 mr-1" /> Replace Values
      </Button>
    </div>
  );
}

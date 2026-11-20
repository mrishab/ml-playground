import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ColumnCastSelectRow } from "./ColumnCastSelectRow";
import { ColumnFindReplaceSection } from "./ColumnFindReplaceSection";
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
      <ColumnCastSelectRow
        columns={columns}
        selectedCol={selectedCol}
        onSelectCol={onSelectCol}
        targetType={targetType}
        onTargetTypeChange={onTargetTypeChange}
      />
      <Button
        size="sm"
        variant="secondary"
        onClick={onCast}
        className="w-full h-7 text-xs active:scale-[0.98]"
      >
        <Sparkles className="h-3 w-3 mr-1" /> {getButtonLabel()}
      </Button>
      <ColumnFindReplaceSection
        findVal={findVal}
        onFindChange={onFindChange}
        replaceVal={replaceVal}
        onReplaceChange={onReplaceChange}
        onReplace={onReplace}
      />
    </div>
  );
}

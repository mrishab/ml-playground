import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CastTargetTypeSelect } from "./CastTargetTypeSelect";
import type { ColumnTargetType } from "./useColumnOpsForm";

export function ColumnCastSelectRow({
  columns,
  selectedCol,
  onSelectCol,
  targetType,
  onTargetTypeChange,
}: {
  columns: string[];
  selectedCol: string;
  onSelectCol: (c: string) => void;
  targetType: ColumnTargetType;
  onTargetTypeChange: (t: ColumnTargetType) => void;
}) {
  return (
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
      <CastTargetTypeSelect value={targetType} onChange={onTargetTypeChange} />
    </div>
  );
}

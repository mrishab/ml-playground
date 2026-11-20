import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ColumnTargetType } from "./useColumnOpsForm";

interface CastTargetTypeSelectProps {
  value: ColumnTargetType;
  onChange: (val: ColumnTargetType) => void;
}

export function CastTargetTypeSelect({
  value,
  onChange,
}: CastTargetTypeSelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="h-8 text-xs">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="numeric">Numeric</SelectItem>
        <SelectItem value="string">String</SelectItem>
        <SelectItem value="boolean">Boolean</SelectItem>
        <SelectItem value="label">Label Encode (0..K-1)</SelectItem>
        <SelectItem value="one-hot">One-Hot Encode</SelectItem>
      </SelectContent>
    </Select>
  );
}

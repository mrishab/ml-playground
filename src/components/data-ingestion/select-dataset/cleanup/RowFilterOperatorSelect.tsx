import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { FilterOperator } from "@/types/dataCleanup";

export function RowFilterOperatorSelect({
  operator,
  onOperatorChange,
}: {
  operator: FilterOperator;
  onOperatorChange: (op: FilterOperator) => void;
}) {
  return (
    <Select
      value={operator}
      onValueChange={(v) => onOperatorChange(v as FilterOperator)}
    >
      <SelectTrigger className="h-9">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="contains">Contains</SelectItem>
        <SelectItem value="equals">Equals</SelectItem>
        <SelectItem value="not_equals">Does Not Equal</SelectItem>
        <SelectItem value="greater_than">Greater Than (&gt;)</SelectItem>
        <SelectItem value="less_than">Less Than (&lt;)</SelectItem>
        <SelectItem value="is_null">Is Missing / Null</SelectItem>
        <SelectItem value="is_not_null">Is Not Null</SelectItem>
      </SelectContent>
    </Select>
  );
}

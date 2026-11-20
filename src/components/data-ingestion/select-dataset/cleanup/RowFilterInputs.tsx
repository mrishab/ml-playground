import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import type { FilterOperator } from "@/types/dataCleanup";
import { RowFilterOperatorSelect } from "./RowFilterOperatorSelect";

interface FilterInputsProps {
  columns: string[];
  column: string;
  onColumnChange: (col: string) => void;
  operator: FilterOperator;
  onOperatorChange: (op: FilterOperator) => void;
  value: string;
  onValueChange: (val: string) => void;
}

export function RowFilterInputs(p: FilterInputsProps) {
  const needsValue = p.operator !== "is_null" && p.operator !== "is_not_null";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <Select value={p.column} onValueChange={p.onColumnChange}>
        <SelectTrigger className="h-9">
          <SelectValue placeholder="Column" />
        </SelectTrigger>
        <SelectContent>
          {p.columns.map((c) => (
            <SelectItem key={c} value={c}>
              {c}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <RowFilterOperatorSelect
        operator={p.operator}
        onOperatorChange={p.onOperatorChange}
      />
      {needsValue ? (
        <Input
          className="h-9"
          placeholder="Value..."
          value={p.value}
          onChange={(e) => p.onValueChange(e.target.value)}
        />
      ) : (
        <div className="h-9 flex items-center text-xs text-muted-foreground px-2">
          Condition checks presence
        </div>
      )}
    </div>
  );
}

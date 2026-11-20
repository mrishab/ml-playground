import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ColumnRenameInputs({
  columns,
  selectedCol,
  onSelectCol,
  newName,
  onNewNameChange,
}: {
  columns: string[];
  selectedCol: string;
  onSelectCol: (col: string) => void;
  newName: string;
  onNewNameChange: (val: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
      <Input
        className="h-8 text-xs"
        placeholder="New column name..."
        value={newName}
        onChange={(e) => onNewNameChange(e.target.value)}
      />
    </div>
  );
}

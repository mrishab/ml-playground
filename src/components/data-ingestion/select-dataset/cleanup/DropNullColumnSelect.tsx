import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function DropNullColumnSelect({
  columns,
  selectedCol,
  onSelectedColChange,
}: {
  columns: string[];
  selectedCol: string;
  onSelectedColChange: (col: string) => void;
}) {
  return (
    <Select value={selectedCol} onValueChange={onSelectedColChange}>
      <SelectTrigger className="h-9">
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
  );
}

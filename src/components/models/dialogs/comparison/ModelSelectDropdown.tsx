import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { SavedModel } from "@/types/savedModel";

export function ModelSelectDropdown({
  label,
  value,
  models,
  placeholder,
  hasNone,
  onSelect,
}: {
  label: string;
  value?: string;
  models: SavedModel[];
  placeholder: string;
  hasNone?: boolean;
  onSelect: (id: string) => void;
}) {
  return (
    <div>
      <label className="text-[11px] font-semibold text-muted-foreground block mb-1">
        {label}
      </label>
      <Select value={value} onValueChange={onSelect}>
        <SelectTrigger className="h-8 text-xs">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {hasNone && (
            <SelectItem value="none" className="text-xs text-muted-foreground">
              (None)
            </SelectItem>
          )}
          {models.map((m) => (
            <SelectItem key={m.id} value={m.id} className="text-xs">
              {m.name} ({m.algorithmName})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

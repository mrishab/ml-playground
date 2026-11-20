import { Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ColumnRenameInputs } from "./ColumnRenameInputs";

interface RenameDropProps {
  columns: string[];
  selectedCol: string;
  onSelectCol: (col: string) => void;
  newName: string;
  onNewNameChange: (val: string) => void;
  onRename: () => void;
  onDrop: () => void;
}

export function ColumnRenameDropSection({
  columns,
  selectedCol,
  onSelectCol,
  newName,
  onNewNameChange,
  onRename,
  onDrop,
}: RenameDropProps) {
  return (
    <div className="space-y-3 p-3 rounded-lg border border-border bg-card/40">
      <h4 className="text-xs font-semibold text-foreground">
        Rename or Drop Column
      </h4>
      <ColumnRenameInputs
        columns={columns}
        selectedCol={selectedCol}
        onSelectCol={onSelectCol}
        newName={newName}
        onNewNameChange={onNewNameChange}
      />
      <div className="flex gap-2">
        <Button
          size="sm"
          onClick={onRename}
          disabled={!newName.trim()}
          className="flex-1 h-7 text-xs transition-[transform,background-color,border-color,color] duration-150 ease-out active:scale-[0.98]"
        >
          <Edit2 className="h-3 w-3 mr-1" /> Rename
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={onDrop}
          disabled={columns.length <= 1}
          className="h-7 text-xs text-destructive hover:bg-destructive/10 transition-[transform,background-color,border-color,color] duration-150 ease-out active:scale-[0.98]"
        >
          <Trash2 className="h-3 w-3 mr-1" /> Drop
        </Button>
      </div>
    </div>
  );
}

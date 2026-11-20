import { SlidersHorizontal } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ColumnRenameDropSection } from "./ColumnRenameDropSection";
import { ColumnCastReplaceSection } from "./ColumnCastReplaceSection";
import { useColumnOpsForm } from "./useColumnOpsForm";
import { useColumnOpsHandlers } from "./useColumnOpsHandlers";
import type { ColumnOpsCardProps } from "./columnOpsTypes";

export function ColumnOpsCard(props: ColumnOpsCardProps) {
  const form = useColumnOpsForm(props.columns);
  const handlers = useColumnOpsHandlers({ form, ...props });

  return (
    <Card className="border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-primary" />
          Column Operations
        </CardTitle>
        <CardDescription>
          Rename, drop, encode, type-convert, or substitute column values
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ColumnRenameDropSection
          columns={props.columns}
          selectedCol={form.selectedCol}
          onSelectCol={form.setSelectedCol}
          newName={form.newName}
          onNewNameChange={form.setNewName}
          onRename={handlers.handleRename}
          onDrop={handlers.handleDrop}
        />
        <ColumnCastReplaceSection
          columns={props.columns}
          selectedCol={form.selectedCol}
          onSelectCol={form.setSelectedCol}
          targetType={form.targetType}
          onTargetTypeChange={form.setTargetType}
          findVal={form.findVal}
          onFindChange={form.setFindVal}
          replaceVal={form.replaceVal}
          onReplaceChange={form.setReplaceVal}
          onCast={handlers.handleCastAction}
          onReplace={handlers.handleReplaceAction}
        />
      </CardContent>
    </Card>
  );
}

import { Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { DropNullStrategy } from "@/types/dataCleanup";
import { useDropNullForm } from "./useDropNullForm";
import { DropNullRowsSection } from "./DropNullRowsSection";
import { DropNullColsSection } from "./DropNullColsSection";

interface DropNullCardProps {
  columns: string[];
  totalMissing: number;
  onDropRows: (strat: DropNullStrategy, targetCol?: string) => void;
  onDropCols: (threshold: number) => void;
}

export function DropNullCard({
  columns,
  totalMissing,
  onDropRows,
  onDropCols,
}: DropNullCardProps) {
  const form = useDropNullForm(columns, onDropRows, onDropCols);

  return (
    <Card className="border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Trash2 className="h-4 w-4 text-destructive" />
          Drop Null Values
        </CardTitle>
        <CardDescription>
          Purge rows or columns contaminated with missing values
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <DropNullRowsSection
            columns={columns}
            totalMissing={totalMissing}
            rowStrategy={form.rowStrategy}
            onRowStrategyChange={form.setRowStrategy}
            selectedCol={form.selectedCol}
            onSelectedColChange={form.setSelectedCol}
            onSubmit={form.handleDropRowsSubmit}
          />
          <DropNullColsSection
            threshold={form.threshold}
            onThresholdChange={form.setThreshold}
            onSubmit={form.handleDropColsSubmit}
          />
        </div>
      </CardContent>
    </Card>
  );
}

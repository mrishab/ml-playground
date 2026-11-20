import type { DataTableColumnDef } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle } from "lucide-react";

export interface ClassificationPredictionRow {
  index: number;
  actual: string;
  predicted: string;
  isCorrect: boolean;
}

export const CLASSIFICATION_PREDICTION_COLUMNS: DataTableColumnDef<ClassificationPredictionRow>[] =
  [
    {
      id: "index",
      accessorKey: "index",
      header: { id: "index", title: "#" },
      cell: ({ getValue }) => (
        <span className="text-muted-foreground">
          {String(getValue() ?? "")}
        </span>
      ),
    },
    {
      id: "actual",
      accessorKey: "actual",
      header: { id: "actual", title: "Actual (y)" },
      cell: ({ getValue }) => (
        <Badge variant="outline" className="font-mono text-xs font-normal">
          {String(getValue() ?? "")}
        </Badge>
      ),
    },
    {
      id: "predicted",
      accessorKey: "predicted",
      header: { id: "predicted", title: "Predicted (ŷ)" },
      cell: ({ getValue }) => (
        <Badge variant="secondary" className="font-mono text-xs font-medium">
          {String(getValue() ?? "")}
        </Badge>
      ),
    },
    {
      id: "isCorrect",
      accessorKey: "isCorrect",
      header: { id: "isCorrect", title: "Outcome" },
      cell: ({ getValue }) =>
        getValue() ? (
          <span className="inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            <CheckCircle2 className="size-3.5" /> Correct
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-xs text-destructive font-medium">
            <XCircle className="size-3.5" /> Incorrect
          </span>
        ),
    },
  ];

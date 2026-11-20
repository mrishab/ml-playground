import { Filter } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { RowFilter } from "@/types/dataCleanup";
import { useRowFilterForm } from "./useRowFilterForm";
import { RowFilterInputs } from "./RowFilterInputs";
import { RowFilterFooter } from "./RowFilterFooter";

interface RowFilterCardProps {
  columns: string[];
  values: unknown[][];
  onFilter: (filter: RowFilter, keep: boolean) => void;
}

export function RowFilterCard({
  columns,
  values,
  onFilter,
}: RowFilterCardProps) {
  const form = useRowFilterForm(columns, values, onFilter);

  return (
    <Card className="border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Filter className="h-4 w-4 text-primary" />
          Row Filter &amp; Investigation
        </CardTitle>
        <CardDescription>
          Inspect and filter rows matching specific conditions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <RowFilterInputs
          columns={columns}
          column={form.column}
          onColumnChange={form.setColumn}
          operator={form.operator}
          onOperatorChange={form.setOperator}
          value={form.value}
          onValueChange={form.setValue}
        />
        <RowFilterFooter
          matchCount={form.matchCount}
          totalCount={values.length}
          onKeep={form.handleKeep}
          onDrop={form.handleDrop}
        />
      </CardContent>
    </Card>
  );
}

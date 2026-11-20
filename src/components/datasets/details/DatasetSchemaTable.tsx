import type { ColumnDtypeMap } from "@/types/savedDataset";
import { DatasetSchemaTableRow } from "./DatasetSchemaTableRow";

interface SchemaTableProps {
  columns: string[];
  dtypes: ColumnDtypeMap;
  data: (string | number | boolean | null)[][];
}

export function DatasetSchemaTable({
  columns,
  dtypes,
  data,
}: SchemaTableProps) {
  return (
    <div className="max-h-72 overflow-auto border border-border rounded-md">
      <table className="w-full text-xs text-left border-collapse">
        <thead className="bg-muted/60 sticky top-0 border-b border-border">
          <tr>
            <th className="p-2 text-[11px] font-semibold text-muted-foreground">
              Column
            </th>
            <th className="p-2 text-[11px] font-semibold text-muted-foreground">
              Data Type
            </th>
            <th className="p-2 text-[11px] font-semibold text-muted-foreground">
              Missing
            </th>
            <th className="p-2 text-[11px] font-semibold text-muted-foreground">
              Missing %
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/60">
          {columns.map((col, idx) => (
            <DatasetSchemaTableRow
              key={col}
              col={col}
              idx={idx}
              dtype={dtypes[col]}
              data={data}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

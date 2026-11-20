import { isMissingValue } from "@/lib/data-cleanup/missingCheck";

export function DatasetSchemaTableRow({
  col,
  idx,
  dtype,
  data,
}: {
  col: string;
  idx: number;
  dtype?: string;
  data: (string | number | boolean | null)[][];
}) {
  let colNulls = 0;
  for (let r = 0; r < data.length; r++) {
    if (isMissingValue(data[r]?.[idx])) colNulls++;
  }
  const pct = data.length > 0 ? (colNulls / data.length) * 100 : 0;

  return (
    <tr className="hover:bg-muted/20">
      <td className="p-2 font-medium text-foreground">{col}</td>
      <td className="p-2 font-mono text-[11px] text-muted-foreground">
        {dtype || "string"}
      </td>
      <td
        className={`p-2 font-mono text-[11px] ${colNulls > 0 ? "text-amber-500 font-semibold" : "text-muted-foreground"}`}
      >
        {colNulls}
      </td>
      <td className="p-2 font-mono text-[11px] text-muted-foreground">
        {pct.toFixed(1)}%
      </td>
    </tr>
  );
}

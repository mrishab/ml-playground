import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { FeatureStatSummary } from "@/types/savedModel";

export function ModelAnalysisTableRow({ item }: { item: FeatureStatSummary }) {
  return (
    <TableRow className="hover:bg-muted/20">
      <TableCell className="font-medium py-1.5">{item.feature}</TableCell>
      <TableCell className="font-mono py-1.5">{item.mean}</TableCell>
      <TableCell className="font-mono py-1.5">{item.std}</TableCell>
      <TableCell className="font-mono py-1.5">
        {item.min} / {item.max}
      </TableCell>
      <TableCell className="py-1.5">
        {item.correlationWithTarget !== undefined ? (
          <Badge variant="outline" className="font-mono text-[10px]">
            r = {item.correlationWithTarget} ({item.correlationStrength})
          </Badge>
        ) : (
          "—"
        )}
      </TableCell>
    </TableRow>
  );
}

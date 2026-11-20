import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { SavedModel } from "@/types/savedModel";
import { ModelAnalysisTableRow } from "./ModelAnalysisTableRow";

export function ModelAnalysisTab({ model }: { model: SavedModel }) {
  const analysis = model.featureAnalysis ?? [];

  if (analysis.length === 0) {
    return (
      <p className="text-xs text-muted-foreground py-4">
        No feature analysis data available.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto max-h-64 border rounded-lg border-border/70 text-xs">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/40">
            <TableHead className="py-2 h-8">Feature</TableHead>
            <TableHead className="py-2 h-8 font-mono">Mean</TableHead>
            <TableHead className="py-2 h-8 font-mono">Std Dev</TableHead>
            <TableHead className="py-2 h-8 font-mono">Min / Max</TableHead>
            <TableHead className="py-2 h-8">Target Correlation</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {analysis.map((item) => (
            <ModelAnalysisTableRow key={item.feature} item={item} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

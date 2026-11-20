import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { LossPoint } from "@/types/loss";

export function TelemetryHistoryTable({ history }: { history: LossPoint[] }) {
  return (
    <div className="overflow-x-auto max-h-48 border rounded-lg border-border/70">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/40">
            <TableHead className="py-1.5 h-7">Step</TableHead>
            <TableHead className="py-1.5 h-7 font-mono">
              Training Loss
            </TableHead>
            <TableHead className="py-1.5 h-7 font-mono">
              Validation / Secondary
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {history.slice(-10).map((pt) => (
            <TableRow key={pt.step}>
              <TableCell className="py-1">{pt.step}</TableCell>
              <TableCell className="font-mono py-1">{pt.loss}</TableCell>
              <TableCell className="font-mono py-1">
                {pt.valLoss ?? pt.secondary ?? "—"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

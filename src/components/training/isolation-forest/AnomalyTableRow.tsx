import { Badge } from "@/components/ui/badge";
import type { AnomalySamplePoint } from "@/types/isolationForest";

export function AnomalyTableRow({
  pt,
  featureKeys,
}: {
  pt: AnomalySamplePoint;
  featureKeys: string[];
}) {
  return (
    <tr className="border-b border-border/40 hover:bg-muted/30">
      <td className="py-1.5 px-2 font-mono">#{pt.index}</td>
      <td className="py-1.5 px-2">
        <Badge variant="destructive" className="font-mono text-[10px] h-4">
          {pt.score.toFixed(3)}
        </Badge>
      </td>
      {featureKeys.map((k) => (
        <td key={k} className="py-1.5 px-2 font-mono text-muted-foreground">
          {pt.features[k]}
        </td>
      ))}
    </tr>
  );
}

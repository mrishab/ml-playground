import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AnomalySamplePoint } from "@/types/isolationForest";
import { AnomalyTableRow } from "./AnomalyTableRow";

type Props = {
  anomalies: AnomalySamplePoint[];
};

export function TopAnomaliesTable({ anomalies }: Props) {
  if (anomalies.length === 0) return null;
  const sample = anomalies[0];
  const featureKeys = Object.keys(sample?.features ?? {}).slice(0, 4);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Top Detected Outliers</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto max-h-56">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b text-muted-foreground">
                <th className="py-1.5 px-2">Row</th>
                <th className="py-1.5 px-2">Score</th>
                {featureKeys.map((k) => (
                  <th key={k} className="py-1.5 px-2">
                    {k}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {anomalies.slice(0, 10).map((pt) => (
                <AnomalyTableRow
                  key={pt.index}
                  pt={pt}
                  featureKeys={featureKeys}
                />
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

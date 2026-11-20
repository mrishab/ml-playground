import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { PCAMetrics } from "@/types/pca";
import { PCALoadingsRow } from "./PCALoadingsRow";

export function PCALoadingsTable({ metrics }: { metrics: PCAMetrics }) {
  const { featureNames, components } = metrics;
  const topComps = components.slice(0, 4);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold">
          Component Loadings (Eigenvectors)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto max-h-64">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b text-muted-foreground">
                <th className="py-1.5 px-2">Feature</th>
                {topComps.map((c) => (
                  <th key={c.name} className="py-1.5 px-2 font-mono">
                    {c.name} ({c.explainedVariance}%)
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {featureNames.map((feat) => (
                <PCALoadingsRow key={feat} feat={feat} topComps={topComps} />
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

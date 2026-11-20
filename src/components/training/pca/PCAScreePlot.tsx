import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { PCAMetrics } from "@/types/pca";
import { PCAScreeSvg } from "./PCAScreeSvg";

export function PCAScreePlot({ metrics }: { metrics: PCAMetrics }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold">
          Scree Plot (Explained Variance by Component)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full relative bg-muted/20 rounded-md border border-border/50 p-3">
          <PCAScreeSvg comps={metrics.components} />
        </div>
      </CardContent>
    </Card>
  );
}

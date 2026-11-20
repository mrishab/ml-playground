import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { PCAMetrics } from "@/types/pca";

export function PCASummaryCards({ metrics }: { metrics: PCAMetrics }) {
  const pc1 = metrics.components[0]?.explainedVariance ?? 0;
  const pc2 = metrics.components[1]?.explainedVariance ?? 0;
  const total = (metrics.totalVarianceExplained * 100).toFixed(1);

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      <Card>
        <CardContent className="p-3">
          <div className="text-[11px] text-muted-foreground">
            Total Variance
          </div>
          <div className="mt-1 font-mono text-xl font-bold">{total}%</div>
          <Badge variant="secondary" className="mt-1 text-[10px]">
            Top {metrics.nComponents} PCs
          </Badge>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-3">
          <div className="text-[11px] text-muted-foreground">PC1 Variance</div>
          <div className="mt-1 font-mono text-xl font-bold">{pc1}%</div>
          <span className="text-[10px] text-muted-foreground">
            λ₁ = {metrics.components[0]?.eigenvalue ?? 0}
          </span>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-3">
          <div className="text-[11px] text-muted-foreground">PC2 Variance</div>
          <div className="mt-1 font-mono text-xl font-bold">{pc2}%</div>
          <span className="text-[10px] text-muted-foreground">
            λ₂ = {metrics.components[1]?.eigenvalue ?? 0}
          </span>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-3">
          <div className="text-[11px] text-muted-foreground">
            Kaiser (λ ≥ 1)
          </div>
          <div className="mt-1 font-mono text-xl font-bold">
            {metrics.kaiserComponentsCount}
          </div>
          <span className="text-[10px] text-muted-foreground">
            Recommended PCs
          </span>
        </CardContent>
      </Card>
    </div>
  );
}

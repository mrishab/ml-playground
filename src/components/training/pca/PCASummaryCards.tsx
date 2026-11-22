import { Badge } from "@/components/ui/badge";
import type { PCAMetrics } from "@/types/pca";
import { PCASingleCard } from "./summary/PCASingleCard";

export function PCASummaryCards({ metrics }: { metrics: PCAMetrics }) {
  const pc1 = metrics.components[0]?.explainedVariance ?? 0;
  const pc2 = metrics.components[1]?.explainedVariance ?? 0;
  const total = (metrics.totalVarianceExplained * 100).toFixed(1);
  const kaiser = metrics.kaiserComponentsCount;

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      <PCASingleCard
        title="Total Variance"
        value={`${total}%`}
        footer={
          <Badge variant="secondary" className="mt-1 text-[10px]">
            Top {metrics.nComponents} PCs
          </Badge>
        }
      />
      <PCASingleCard
        title="PC1 Variance"
        value={`${pc1}%`}
        footer={
          <span className="text-[10px] text-muted-foreground">
            λ₁ = {metrics.components[0]?.eigenvalue ?? 0}
          </span>
        }
      />
      <PCASingleCard
        title="PC2 Variance"
        value={`${pc2}%`}
        footer={
          <span className="text-[10px] text-muted-foreground">
            λ₂ = {metrics.components[1]?.eigenvalue ?? 0}
          </span>
        }
      />
      <PCASingleCard
        title="Kaiser (λ ≥ 1)"
        value={kaiser !== null ? kaiser : "N/A"}
        footer={
          <span
            className="text-[10px] text-muted-foreground"
            title={
              kaiser === null
                ? "Kaiser rule requires standardized data."
                : undefined
            }
          >
            {kaiser !== null ? "Recommended PCs" : "Raw Cov (Req Standardized)"}
          </span>
        }
      />
    </div>
  );
}

import type { RegressionMetrics } from "@/types/regression";
import { MetricBox } from "../MetricBox";

export function RegressionMetricsGrid({ reg }: { reg: RegressionMetrics }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      <MetricBox label="R² Score" val={reg.rSquared.toFixed(4)} />
      <MetricBox label="MSE" val={reg.mse.toFixed(4)} />
      <MetricBox label="RMSE" val={Math.sqrt(reg.mse).toFixed(4)} />
    </div>
  );
}

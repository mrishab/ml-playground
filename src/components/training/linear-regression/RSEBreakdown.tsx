import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { RegressionMetrics } from "@/types/regression";
import { computeRSEStats } from "./rse/computeRSEStats";
import { RSETrainSection } from "./rse/RSETrainSection";
import { RSETestSection } from "./rse/RSETestSection";

type RSEBreakdownProps = {
  metrics: RegressionMetrics;
};

export function RSEBreakdown({ metrics }: RSEBreakdownProps) {
  const stats = computeRSEStats(metrics);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">
          Residual Standard Error (RSE) & RMSE Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="rounded-lg bg-muted/60 p-3 text-center space-y-1">
          <p className="font-mono text-sm">
            Train RSE = √(RSS<sub>train</sub> / (n<sub>train</sub> - p - 1))
          </p>
          <p className="text-xs text-muted-foreground">
            Test RMSE = √(RSS<sub>test</sub> / n<sub>test</sub>) = √MSE
          </p>
        </div>

        <div className="space-y-3">
          <RSETrainSection {...stats} />
          <RSETestSection
            testRss={stats.testRss}
            testN={stats.testN}
            testRmse={stats.testRmse}
          />
        </div>
      </CardContent>
    </Card>
  );
}

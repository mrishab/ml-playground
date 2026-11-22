import type { RegressionMetrics } from "@/types/regression";
import { ActualVsPredictedCard } from "./residuals/ActualVsPredictedCard";
import { ResidualsVsFittedCard } from "./residuals/ResidualsVsFittedCard";

export function ResidualsPlot({ metrics }: { metrics: RegressionMetrics }) {
  const { actuals, predictions, residuals } = metrics;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <ActualVsPredictedCard actuals={actuals} predictions={predictions} />
      <ResidualsVsFittedCard predictions={predictions} residuals={residuals} />
    </div>
  );
}

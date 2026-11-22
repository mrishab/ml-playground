import type { RegressionMetrics } from "@/types/regression";

export function calculateMetrics(
  predictions: number[],
  actuals: number[],
  weights?: { coefficients: number[]; intercept: number },
  trainStats?: {
    trainRss: number;
    trainN: number;
    p: number;
  },
): RegressionMetrics {
  const n = predictions.length;
  const yMean = actuals.reduce((sum, y) => sum + y, 0) / Math.max(1, n);
  const residuals = actuals.map((y, i) => y - predictions[i]);
  const squaredResiduals = residuals.map((r) => r * r);

  const rss = squaredResiduals.reduce((sum, sr) => sum + sr, 0);
  const tss = actuals.reduce((sum, y) => sum + (y - yMean) ** 2, 0);
  const mse = n > 0 ? rss / n : 0;
  const rmse = Math.sqrt(mse);

  const p = trainStats?.p ?? weights?.coefficients?.length ?? 1;
  const testDof = n - p - 1;
  const rse = testDof > 0 ? Math.sqrt(rss / testDof) : rmse;

  let trainRse: number | undefined;
  let trainDof: number | undefined;
  if (trainStats) {
    trainDof = trainStats.trainN - trainStats.p - 1;
    if (trainDof > 0) {
      trainRse = Math.sqrt(trainStats.trainRss / trainDof);
    }
  }

  const rSquared = tss > 0 ? 1 - rss / tss : 0;

  return {
    mse,
    rmse,
    rse,
    rSquared,
    residuals,
    squaredResiduals,
    rss,
    tss,
    yMean,
    n,
    predictions,
    actuals,
    weights,
    p,
    trainRse,
    trainRss: trainStats?.trainRss,
    trainN: trainStats?.trainN,
    trainDof,
  };
}

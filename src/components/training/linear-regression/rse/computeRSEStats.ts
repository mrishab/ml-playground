import type { RegressionMetrics } from "@/types/regression";

export function computeRSEStats(metrics: RegressionMetrics) {
  const p = metrics.p ?? metrics.weights?.coefficients?.length ?? 1;
  const trainN = metrics.trainN ?? metrics.n;
  const trainDof = metrics.trainDof ?? Math.max(1, trainN - p - 1);
  const trainRss = metrics.trainRss ?? metrics.rss;
  const trainRssOverDof = trainRss / trainDof;
  const trainRse = metrics.trainRse ?? Math.sqrt(trainRssOverDof);

  const testRss = metrics.rss;
  const testN = metrics.n;
  const testRmse = metrics.rmse ?? Math.sqrt(testRss / Math.max(1, testN));

  return {
    p,
    trainN,
    trainDof,
    trainRss,
    trainRssOverDof,
    trainRse,
    testRss,
    testN,
    testRmse,
  };
}

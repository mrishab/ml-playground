export type RegressionMetrics = {
  // Core metrics (evaluated on Test set)
  mse: number;
  rmse: number;
  rse: number;
  rSquared: number;

  // Train set metrics for comparison
  trainMse?: number;
  trainRse?: number;
  trainRSquared?: number;
  trainRss?: number;
  trainN?: number;
  p?: number;
  trainDof?: number;

  // Intermediate values for breakdown
  residuals: number[];
  squaredResiduals: number[];
  rss: number;
  tss: number;
  yMean: number;
  n: number;

  // Predictions
  predictions: number[];
  actuals: number[];

  // Learned parameters
  weights?: {
    coefficients: number[];
    intercept: number;
  };
};

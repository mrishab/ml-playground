export function getCoefficientsTitle(algorithm: string): string {
  if (algorithm === "pca") return "Principal Component (PC1) Loadings";
  if (["random-forest", "xgboost", "isolation-forest"].includes(algorithm)) {
    return "Feature Importance Scores";
  }
  return "Feature Weights / Coefficients";
}

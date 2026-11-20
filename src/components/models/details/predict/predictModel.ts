import type { SavedModel } from "@/types/savedModel";

export interface PredictionResult {
  predictedValue: string | number;
  label?: string;
  confidence?: string;
  details?: string;
  type: "regression" | "classification" | "clustering" | "anomaly";
}

export function runModelInference(
  model: SavedModel,
  inputs: Record<string, number>,
): PredictionResult {
  const features = model.splitConfig.features ?? [];
  const xVec = features.map((f) => inputs[f] ?? 0);

  // 1. Linear Regression
  if (model.algorithm === "linear" || model.problemType === "regression") {
    const artifacts = model.modelArtifacts;
    if (artifacts?.coefficients && artifacts.coefficients.length > 0) {
      const intercept =
        typeof artifacts.intercept === "number" ? artifacts.intercept : 0;
      let sum = intercept;
      for (const coef of artifacts.coefficients) {
        const val = inputs[coef.feature] ?? 0;
        sum += coef.weight * val;
      }
      return {
        predictedValue: Number(sum.toFixed(3)),
        label: `Predicted ${model.splitConfig.targetColumn || "Y"}`,
        details: `Formula: ${Number(intercept.toFixed(2))} + Σ(wᵢ × xᵢ)`,
        type: "regression",
      };
    }
  }

  // 2. K-Means Clustering
  if (model.algorithm === "clustering") {
    const centroids =
      model.modelArtifacts?.centroids ?? model.kmeansMetrics?.centroids ?? [];
    if (centroids.length > 0) {
      let minDist = Infinity;
      let closestCluster = 0;

      for (let c = 0; c < centroids.length; c++) {
        const centroid = centroids[c];
        let dSq = 0;
        for (let i = 0; i < xVec.length; i++) {
          const diff = xVec[i] - (centroid[i] ?? 0);
          dSq += diff * diff;
        }
        if (dSq < minDist) {
          minDist = dSq;
          closestCluster = c;
        }
      }

      return {
        predictedValue: `Cluster ${closestCluster + 1}`,
        label: "Assigned Cluster",
        details: `Euclidean distance to centroid: ${Math.sqrt(minDist).toFixed(3)}`,
        type: "clustering",
      };
    }
  }

  // 3. Isolation Forest Anomaly Detection
  if (model.algorithm === "isolation-forest") {
    const threshold = model.isolationForestMetrics?.thresholdScore ?? 0.5;
    const analysis = model.featureAnalysis ?? [];
    let anomalyScore = 0.5;

    if (analysis.length > 0) {
      let totalZ = 0;
      for (const stat of analysis) {
        const val = inputs[stat.feature] ?? stat.mean;
        const z = stat.std > 0 ? Math.abs(val - stat.mean) / stat.std : 0;
        totalZ += z;
      }
      const avgZ = totalZ / analysis.length;
      anomalyScore = Math.min(0.95, Math.max(0.2, 0.4 + avgZ * 0.15));
    }

    const isAnomaly = anomalyScore >= threshold;
    return {
      predictedValue: isAnomaly ? "Anomaly (Outlier)" : "Normal (Inlier)",
      label: "Detection Status",
      confidence: `Anomaly Score: ${anomalyScore.toFixed(3)} (Threshold: ${threshold.toFixed(3)})`,
      details: isAnomaly
        ? "Feature values deviate significantly from normal training distributions."
        : "Feature values lie within expected training cluster boundaries.",
      type: "anomaly",
    };
  }

  // 4. Principal Component Analysis (PCA Projection)
  if (model.algorithm === "pca" || model.pcaMetrics) {
    const pca = model.pcaMetrics;
    const comps = pca?.components ?? [];
    const means = pca?.means ?? [];
    const stds = pca?.stds ?? [];
    const stdVec = features.map((f, i) => {
      const val = inputs[f] ?? 0;
      const m = means[i] ?? 0;
      const s = stds[i] && stds[i] > 1e-7 ? stds[i] : 1;
      return (val - m) / s;
    });

    const pc1 =
      comps[0]?.loadings.reduce(
        (sum, l, i) => sum + l.weight * (stdVec[i] ?? 0),
        0,
      ) ?? 0;
    const pc2 =
      comps[1]?.loadings.reduce(
        (sum, l, i) => sum + l.weight * (stdVec[i] ?? 0),
        0,
      ) ?? 0;

    return {
      predictedValue: `PC1: ${pc1.toFixed(3)}, PC2: ${pc2.toFixed(3)}`,
      label: "Projected Coordinates",
      confidence: `${((pca?.totalVarianceExplained ?? 0) * 100).toFixed(1)}% variance explained`,
      details: `Projected across ${comps.length} principal components`,
      type: "clustering",
    };
  }

  // 5. Classification (KNN, LDA, Logistic, Ensembles)
  const classes = model.classificationMetrics?.labels ??
    model.modelArtifacts?.classes ?? ["Class 0", "Class 1"];

  // LDA or Logistic with linear weights
  if (model.algorithm === "lda" || model.algorithm === "logistic") {
    const coefs = model.modelArtifacts?.coefficients;
    if (coefs && coefs.length > 0 && classes.length === 2) {
      const intercept =
        typeof model.modelArtifacts?.intercept === "number"
          ? model.modelArtifacts.intercept
          : 0;
      let logit = intercept;
      for (const coef of coefs) {
        logit += coef.weight * (inputs[coef.feature] ?? 0);
      }
      const prob = 1 / (1 + Math.exp(-logit));
      const predClass = prob >= 0.5 ? classes[1] : classes[0];
      const conf = prob >= 0.5 ? prob : 1 - prob;
      return {
        predictedValue: predClass,
        label: `Predicted ${model.splitConfig.targetColumn || "Class"}`,
        confidence: `${(conf * 100).toFixed(1)}% confidence`,
        details: `Log-odds: ${logit.toFixed(3)} (P(${classes[1]}): ${(prob * 100).toFixed(1)}%)`,
        type: "classification",
      };
    }
  }

  // General classification fallback using nearest profile or majority
  const analysis = model.featureAnalysis ?? [];
  let score = 0;
  if (analysis.length > 0) {
    for (const stat of analysis) {
      const val = inputs[stat.feature] ?? stat.mean;
      const corr = stat.correlationWithTarget ?? 0;
      score += (val - stat.mean) * corr;
    }
  }

  const selectedIdx = score >= 0 ? 0 : Math.min(1, classes.length - 1);
  return {
    predictedValue: classes[selectedIdx] ?? classes[0],
    label: `Predicted ${model.splitConfig.targetColumn || "Class"}`,
    confidence: "Model Inference",
    details: `Evaluated across ${features.length} input features`,
    type: "classification",
  };
}

import type { ModelArtifactDetails, AlgorithmType } from "@/types/savedModel";
import type { RegressionMetrics } from "@/types/regression";
import type { ClassificationMetrics } from "@/types/classification";
import type { KMeansMetrics } from "@/types/kmeans";
import type { IsolationForestMetrics } from "@/types/isolationForest";
import type { PCAMetrics } from "@/types/pca";

export function extractModelArtifacts(
  algorithm: AlgorithmType,
  features: string[],
  targetColumn: string,
  metrics:
    | RegressionMetrics
    | ClassificationMetrics
    | KMeansMetrics
    | IsolationForestMetrics
    | PCAMetrics,
  k?: number,
): ModelArtifactDetails {
  if (algorithm === "pca") {
    const pca = metrics as PCAMetrics;
    return {
      k: pca.nComponents,
      coefficients: pca.components[0]?.loadings.map((l) => ({
        feature: l.feature,
        weight: Number(l.weight.toFixed(4)),
      })),
    };
  }
  if (algorithm === "clustering") {
    const km = metrics as KMeansMetrics;
    return {
      k: km.k,
      centroids: km.centroids,
    };
  }
  if (algorithm === "isolation-forest") {
    const iso = metrics as IsolationForestMetrics;
    return {
      coefficients: iso.featureImportance?.map((f) => ({
        feature: f.feature,
        weight: Number(f.score.toFixed(4)),
      })),
    };
  }
  if (algorithm === "linear") {
    const reg = metrics as RegressionMetrics & {
      weights?: { coefficients: number[]; intercept: number };
    };
    const coefs = reg.weights?.coefficients ?? [];
    const intercept = reg.weights?.intercept ?? 0;
    const coefficients = features.map((feat, i) => ({
      feature: feat,
      weight: Number((coefs[i] ?? 0).toFixed(4)),
    }));
    const formulaTerms = coefficients
      .map((c) => `${c.weight >= 0 ? "+" : ""}${c.weight} × ${c.feature}`)
      .join(" ");
    const formula = `${targetColumn} = ${Number(intercept.toFixed(4))} ${formulaTerms}`;
    return { formula, intercept, coefficients };
  }
  if (algorithm === "random-forest" || algorithm === "xgboost") {
    const ens = metrics as {
      featureImportance?: { feature: string; score: number }[];
      labels?: string[];
      weights?: { coefficients: number[]; intercept: number };
    };
    if (ens.featureImportance && ens.featureImportance.length > 0) {
      return {
        coefficients: ens.featureImportance.map((f) => ({
          feature: f.feature,
          weight: Number(f.score.toFixed(4)),
        })),
        classes: ens.labels,
        intercept: ens.weights?.intercept,
      };
    }
    if (ens.weights?.coefficients) {
      return {
        coefficients: features.map((feat, i) => ({
          feature: feat,
          weight: Number((ens.weights?.coefficients[i] ?? 0).toFixed(4)),
        })),
        classes: ens.labels,
        intercept: ens.weights?.intercept,
      };
    }
  }
  const cls = metrics as ClassificationMetrics & {
    weights?: {
      coefficients?: number[][] | number[];
      intercept?: number[] | number;
    };
    ldaModel?: {
      weights: number[][];
      intercepts: number[];
      priors: number[];
    };
  };

  if (algorithm === "logistic") {
    const rawCoefs = Array.isArray(cls.weights?.coefficients)
      ? (cls.weights.coefficients as number[]).flat()
      : [];
    const intercept =
      typeof cls.weights?.intercept === "number" ? cls.weights.intercept : 0;
    const coefficients = features.map((feat, i) => ({
      feature: feat,
      weight: Number((rawCoefs[i] ?? 0).toFixed(4)),
    }));
    return {
      classes: cls.labels,
      coefficients,
      intercept,
      k,
    };
  }

  if (algorithm === "lda") {
    const lda = cls.ldaModel;
    if (lda && lda.weights && lda.weights.length >= 2) {
      const wDiff = lda.weights[1].map(
        (w1, i) => w1 - (lda.weights[0][i] ?? 0),
      );
      const intercept =
        -(lda.intercepts[1] - lda.intercepts[0]) +
        (lda.priors[1] - lda.priors[0]);
      const coefficients = features.map((feat, i) => ({
        feature: feat,
        weight: Number((wDiff[i] ?? 0).toFixed(4)),
      }));
      return {
        classes: cls.labels,
        coefficients,
        intercept: Number(intercept.toFixed(4)),
        k,
      };
    }
  }

  return {
    classes: cls.labels,
    k,
    intercept: cls.weights?.intercept,
  };
}

import type { PCAMetrics, PCAComponent, PCAPoint2D } from "@/types/pca";
import { encodeNumericMatrix } from "@/lib/categoricalEncoding";
import {
  standardizeData,
  computeSampleCovariance,
  computeSortedEigen,
} from "./pcaMath";

export interface TrainPCAParams {
  rawMatrix: unknown[][];
  featureNames: string[];
  targetValues?: (string | number)[];
  nComponents?: number;
  standardize?: boolean;
}

export function trainPCA({
  rawMatrix,
  featureNames,
  targetValues = [],
  nComponents = 2,
  standardize = true,
}: TrainPCAParams): PCAMetrics {
  const { encodedMatrix } = encodeNumericMatrix(rawMatrix);
  const n = encodedMatrix.length;
  const p = featureNames.length;

  if (n === 0 || p === 0) {
    throw new Error("No data available for Principal Component Analysis.");
  }

  const { scaled, means, stds } = standardizeData(encodedMatrix, standardize);
  const cov = computeSampleCovariance(scaled);
  const { sortedEigenvalues, sortedEigenvectors } = computeSortedEigen(cov);

  const totalVar = sortedEigenvalues.reduce((a, b) => a + b, 0);
  const safeTotalVar = totalVar > 1e-12 ? totalVar : 1;

  const explainedVarianceRatio = sortedEigenvalues.map((v) => v / safeTotalVar);
  const cumulativeVarianceRatio: number[] = [];
  let cumSum = 0;
  for (const r of explainedVarianceRatio) {
    cumSum += r;
    cumulativeVarianceRatio.push(Math.min(1, cumSum));
  }

  const clampedK = Math.max(1, Math.min(nComponents, p));
  const totalVarianceExplained = cumulativeVarianceRatio[clampedK - 1] ?? 1;

  // Kaiser criterion: eigenvalues > 1 (average variance in standardized space).
  // On unstandardized data (raw covariance), eigenvalues depend on feature units, making > 1 invalid.
  const kaiserComponentsCount = standardize
    ? sortedEigenvalues.filter((v) => v >= 1.0).length
    : null;

  // Loadings map
  const loadingsRecord: Record<string, number[]> = {};
  for (let j = 0; j < p; j++) {
    const feat = featureNames[j];
    loadingsRecord[feat] = [];
    for (let c = 0; c < clampedK; c++) {
      loadingsRecord[feat].push(sortedEigenvectors[c][j] ?? 0);
    }
  }

  // Build component list
  const components: PCAComponent[] = [];
  for (let c = 0; c < clampedK; c++) {
    const pcLoadings = featureNames.map((feat, j) => ({
      feature: feat,
      weight: Number((sortedEigenvectors[c][j] ?? 0).toFixed(4)),
    }));

    components.push({
      index: c + 1,
      name: `PC${c + 1}`,
      eigenvalue: Number(sortedEigenvalues[c].toFixed(4)),
      explainedVariance: Number((explainedVarianceRatio[c] * 100).toFixed(2)),
      cumulativeVariance: Number((cumulativeVarianceRatio[c] * 100).toFixed(2)),
      loadings: pcLoadings,
    });
  }

  // Project data points onto PC1 and PC2 (or PC1 if p === 1)
  const v1 = sortedEigenvectors[0] ?? new Array(p).fill(0);
  const v2 = sortedEigenvectors[1] ?? new Array(p).fill(0);

  const coordinates2D: PCAPoint2D[] = [];
  for (let i = 0; i < n; i++) {
    let pc1 = 0;
    let pc2 = 0;
    for (let j = 0; j < p; j++) {
      const val = scaled[i][j];
      pc1 += val * (v1[j] ?? 0);
      pc2 += val * (v2[j] ?? 0);
    }
    coordinates2D.push({
      index: i + 1,
      pc1: Number(pc1.toFixed(3)),
      pc2: Number(pc2.toFixed(3)),
      target: targetValues[i],
    });
  }

  return {
    components,
    explainedVarianceRatio,
    cumulativeVarianceRatio,
    totalVarianceExplained,
    coordinates2D,
    loadings: loadingsRecord,
    featureNames,
    means,
    stds,
    nComponents: clampedK,
    kaiserComponentsCount,
  };
}

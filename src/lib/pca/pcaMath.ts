import { jacobiEigenvalues } from "./jacobi";

export interface StandardizeResult {
  scaled: number[][];
  means: number[];
  stds: number[];
}

export function standardizeData(
  data: number[][],
  standardize = true,
): StandardizeResult {
  const n = data.length;
  const p = data[0]?.length ?? 0;
  const means: number[] = new Array(p).fill(0);
  const stds: number[] = new Array(p).fill(1);

  if (n === 0 || p === 0) {
    return { scaled: [], means, stds };
  }

  // Calculate means
  for (let j = 0; j < p; j++) {
    let sum = 0;
    for (let i = 0; i < n; i++) {
      const v = Number(data[i][j]);
      sum += isNaN(v) ? 0 : v;
    }
    means[j] = sum / n;
  }

  // Calculate stds if standardize is true
  if (standardize) {
    for (let j = 0; j < p; j++) {
      let varSum = 0;
      for (let i = 0; i < n; i++) {
        const diff = (Number(data[i][j]) || 0) - means[j];
        varSum += diff * diff;
      }
      const variance = n > 1 ? varSum / (n - 1) : 0;
      const std = Math.sqrt(variance);
      stds[j] = std > 1e-7 ? std : 1;
    }
  }

  const scaled = data.map((row) =>
    row.map((val, j) => {
      const num = Number(val) || 0;
      return (num - means[j]) / stds[j];
    }),
  );

  return { scaled, means, stds };
}

export function computeSampleCovariance(scaled: number[][]): number[][] {
  const n = scaled.length;
  const p = scaled[0]?.length ?? 0;
  const cov: number[][] = Array.from({ length: p }, () =>
    new Array<number>(p).fill(0),
  );

  const denom = Math.max(1, n - 1);
  for (let j = 0; j < p; j++) {
    for (let k = j; k < p; k++) {
      let sum = 0;
      for (let i = 0; i < n; i++) {
        sum += scaled[i][j] * scaled[i][k];
      }
      const val = sum / denom;
      cov[j][k] = val;
      cov[k][j] = val;
    }
  }

  return cov;
}

export function computeSortedEigen(cov: number[][]) {
  const { eigenvalues, eigenvectors } = jacobiEigenvalues(cov);
  const indices = eigenvalues
    .map((val, idx) => ({ val, idx }))
    .sort((a, b) => b.val - a.val)
    .map((item) => item.idx);

  const sortedEigenvalues = indices.map((i) => eigenvalues[i]);
  const sortedEigenvectors = indices.map((i) => eigenvectors[i]);

  return { sortedEigenvalues, sortedEigenvectors };
}

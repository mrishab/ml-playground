import type { KMeansMetrics } from "@/types/kmeans";
import type { StepCallback } from "@/types/loss";
import { assignClusters, distanceSq, updateCentroids } from "./kmeansMath";
import { initRandomCentroids } from "./initCentroids";

function standardizeFeatures(data: number[][], dim: number) {
  const means: number[] = new Array(dim).fill(0);
  const stds: number[] = new Array(dim).fill(0);
  const n = Math.max(1, data.length);

  for (let c = 0; c < dim; c++) {
    let sum = 0;
    for (let r = 0; r < data.length; r++) {
      const v = Number(data[r][c]);
      sum += isNaN(v) ? 0 : v;
    }
    means[c] = sum / n;
    let varSum = 0;
    for (let r = 0; r < data.length; r++) {
      const v = Number(data[r][c]);
      const diff = (isNaN(v) ? 0 : v) - means[c];
      varSum += diff * diff;
    }
    const std = Math.sqrt(varSum / n);
    stds[c] = std > 1e-7 ? std : 1;
  }

  const scaled = data.map((row) =>
    row.map((v, c) => ((Number(v) || 0) - means[c]) / stds[c]),
  );

  return { scaled, means, stds };
}

export async function trainKMeans(
  data: number[][],
  featureNames: string[],
  k: number,
  maxIter = 25,
  onStep?: StepCallback,
): Promise<KMeansMetrics> {
  const dim = data[0]?.length ?? 1;
  const clampedK = Math.max(2, Math.min(k, data.length));
  const { scaled, means, stds } = standardizeFeatures(data, dim);

  let centroids = initRandomCentroids(scaled, clampedK);
  let labels: number[] = [];
  let inertia = 0;
  let sizes: number[] = [];
  let iterations = 0;

  for (let iter = 1; iter <= maxIter; iter++) {
    iterations = iter;
    const assignment = assignClusters(scaled, centroids);
    labels = assignment.labels;
    inertia = assignment.inertia;

    const updated = updateCentroids(scaled, labels, clampedK, dim);
    let delta = 0;
    for (let c = 0; c < clampedK; c++) {
      delta += Math.sqrt(distanceSq(centroids[c], updated.newCentroids[c]));
    }
    centroids = updated.newCentroids;
    sizes = updated.sizes;

    const point = {
      step: iter,
      loss: Number(inertia.toFixed(2)),
      secondary: Number(delta.toFixed(4)),
    };
    onStep?.(point, iter === maxIter || delta < 1e-4);
    await new Promise((r) => setTimeout(r, 35));

    if (delta < 1e-4 && iter > 2) break;
  }

  const unscaledCentroids = centroids.map((row) =>
    row.map((v, c) => Number((v * stds[c] + means[c]).toFixed(3))),
  );

  return {
    k: clampedK,
    inertia: Number(inertia.toFixed(2)),
    iterations,
    converged: true,
    clusterSizes: sizes,
    centroids: unscaledCentroids,
    labels,
    featureNames,
  };
}

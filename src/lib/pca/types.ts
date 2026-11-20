import type { PCAMetrics } from "@/types/pca";

export interface PCATrainOptions {
  nComponents?: number;
  standardize?: boolean;
}

export type { PCAMetrics };

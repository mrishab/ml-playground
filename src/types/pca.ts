export interface PCAComponent {
  index: number;
  name: string;
  eigenvalue: number;
  explainedVariance: number;
  cumulativeVariance: number;
  loadings: { feature: string; weight: number }[];
}

export interface PCAPoint2D {
  index: number;
  pc1: number;
  pc2: number;
  target?: string | number;
}

export interface PCAMetrics {
  components: PCAComponent[];
  explainedVarianceRatio: number[];
  cumulativeVarianceRatio: number[];
  totalVarianceExplained: number;
  coordinates2D: PCAPoint2D[];
  loadings: Record<string, number[]>;
  featureNames: string[];
  means: number[];
  stds: number[];
  nComponents: number;
  kaiserComponentsCount: number;
}

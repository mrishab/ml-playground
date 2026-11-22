export type TransformationType = "none" | "polynomial" | "interaction";
export type CategoricalEncodingMode = "one-hot" | "ordinal";

export type ProblemType =
  | "regression"
  | "classification"
  | "clustering"
  | "dimensionality_reduction"
  | "unsupervised";

export type SelectedFeature = {
  id: string;
  column: string;
  transformation: TransformationType;
  polynomialDegree?: number;
  interactionWith?: string;
  encoding?: CategoricalEncodingMode;
};

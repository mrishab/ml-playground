import type {
  CategoricalEncodingMode,
  SelectedFeature,
  TransformationType,
} from "./types";

let featureIdCounter = 0;

export const resetFeatureCounter = () => {
  featureIdCounter = 0;
};

export const generateFeatureId = () => {
  featureIdCounter += 1;
  return `feature-${featureIdCounter}`;
};

export const createFeature = (column: string): SelectedFeature => ({
  id: generateFeatureId(),
  column,
  transformation: "none",
});

export const updateFeature = (
  features: SelectedFeature[],
  id: string,
  transformation: TransformationType,
  options?: { polynomialDegree?: number; interactionWith?: string },
): SelectedFeature[] => {
  const target = features.find((f) => f.id === id);
  if (!target) return features;

  if (target.transformation === "none" && transformation !== "none") {
    const derivedFeature: SelectedFeature = {
      id: generateFeatureId(),
      column: target.column,
      transformation,
      polynomialDegree:
        options?.polynomialDegree ??
        (transformation === "polynomial" ? 2 : undefined),
      interactionWith: options?.interactionWith,
      encoding: target.encoding,
    };
    return [...features, derivedFeature];
  }

  return features.map((f) =>
    f.id === id
      ? {
          ...f,
          transformation,
          polynomialDegree: options?.polynomialDegree ?? f.polynomialDegree,
          interactionWith: options?.interactionWith ?? f.interactionWith,
        }
      : f,
  );
};

export const updateFeatureEncoding = (
  features: SelectedFeature[],
  id: string,
  encoding: CategoricalEncodingMode,
): SelectedFeature[] =>
  features.map((f) => (f.id === id ? { ...f, encoding } : f));

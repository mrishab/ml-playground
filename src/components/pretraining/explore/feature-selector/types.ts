import type {
  TransformationType,
  SelectedFeature,
  CategoricalEncodingMode,
} from "@/stores/mlConfig";

export interface FeatureItemCardProps {
  feature: SelectedFeature;
  availableInteractionColumns: string[];
  onRemove: (id: string) => void;
  onTransformChange: (id: string, t: TransformationType) => void;
  onDegreeChange: (id: string, deg: number) => void;
  onInteractionChange: (id: string, col: string) => void;
  onEncodingChange?: (id: string, encoding: "one-hot" | "ordinal") => void;
}

export type UseFeatureSelectorProps = {
  columns?: string[];
  numericColumns: string[];
  selectedFeatures: SelectedFeature[];
  availableInteractionColumns: string[];
  addFeature: (column: string) => void;
  removeFeature: (id: string) => void;
  updateFeatureTransformation: (
    id: string,
    transformation: TransformationType,
    options?: { polynomialDegree?: number; interactionWith?: string },
  ) => void;
  updateFeatureEncoding?: (
    id: string,
    encoding: CategoricalEncodingMode,
  ) => void;
  clearFeatures: () => void;
};

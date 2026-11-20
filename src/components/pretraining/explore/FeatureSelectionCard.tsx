import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FeatureSelector } from "./FeatureSelector";
import { TargetColumnSelect } from "./TargetColumnSelect";
import type { SelectedFeature, TransformationType } from "@/stores/mlConfig";

interface FeatureSelectionCardProps {
  targetColumn: string;
  setTargetColumn: (col: string) => void;
  columns: string[];
  numericColumns: string[];
  selectedFeatures: SelectedFeature[];
  availableInteractionColumns: string[];
  addFeature: (c: string) => void;
  removeFeature: (id: string) => void;
  updateFeatureTransformation: (
    id: string,
    t: TransformationType,
    opt?: { polynomialDegree?: number; interactionWith?: string },
  ) => void;
  clearFeatures: () => void;
}

export function FeatureSelectionCard(props: FeatureSelectionCardProps) {
  // Exclude target variable (Y) from features (X) to prevent target leakage
  const filteredColumns = props.columns.filter(
    (col) => col !== props.targetColumn,
  );
  const filteredNumericColumns = props.numericColumns.filter(
    (col) => col !== props.targetColumn,
  );
  const filteredInteractionColumns = props.availableInteractionColumns.filter(
    (col) => col !== props.targetColumn,
  );

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Feature Selection</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <TargetColumnSelect
          value={props.targetColumn}
          onChange={props.setTargetColumn}
          columns={props.columns}
        />
        <div className="border-t pt-4">
          <FeatureSelector
            {...props}
            columns={filteredColumns}
            numericColumns={filteredNumericColumns}
            availableInteractionColumns={filteredInteractionColumns}
          />
        </div>
      </CardContent>
    </Card>
  );
}

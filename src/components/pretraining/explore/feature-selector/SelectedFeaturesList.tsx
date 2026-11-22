import { ScrollArea } from "@/components/ui/scroll-area";
import type { TransformationType, SelectedFeature } from "@/stores/mlConfig";
import { FeatureItemCard } from "./FeatureItemCard";

interface SelectedFeaturesListProps {
  selectedFeatures: SelectedFeature[];
  availableInteractionColumns: string[];
  onRemove: (id: string) => void;
  onTransformChange: (id: string, t: TransformationType) => void;
  onDegreeChange: (id: string, deg: number) => void;
  onInteractionChange: (id: string, col: string) => void;
  onEncodingChange?: (id: string, encoding: "one-hot" | "ordinal") => void;
}

export function SelectedFeaturesList({
  selectedFeatures,
  availableInteractionColumns,
  onRemove,
  onTransformChange,
  onDegreeChange,
  onInteractionChange,
  onEncodingChange,
}: SelectedFeaturesListProps) {
  if (selectedFeatures.length === 0) {
    return (
      <div className="flex min-h-[80px] items-center justify-center rounded-md border border-dashed py-6 text-sm text-muted-foreground">
        No features selected
      </div>
    );
  }

  return (
    <ScrollArea className="max-h-[240px] rounded-md border p-3 sm:max-h-[280px]">
      <div className="space-y-3">
        {selectedFeatures.map((feature) => (
          <FeatureItemCard
            key={feature.id}
            feature={feature}
            availableInteractionColumns={availableInteractionColumns}
            onRemove={onRemove}
            onTransformChange={onTransformChange}
            onDegreeChange={onDegreeChange}
            onInteractionChange={onInteractionChange}
            onEncodingChange={onEncodingChange}
          />
        ))}
      </div>
    </ScrollArea>
  );
}

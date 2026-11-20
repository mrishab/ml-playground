import { Badge } from "@/components/ui/badge";
import type { SavedModel } from "@/types/savedModel";
import { ArtifactCoefficientsList } from "./ArtifactCoefficientsList";
import { getCoefficientsTitle } from "./coefficientTitle";

export function ModelArtifactsTab({ model }: { model: SavedModel }) {
  const artifacts = model.modelArtifacts;
  if (!artifacts) {
    return (
      <p className="text-xs text-muted-foreground py-4">
        No model parameters available.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3 py-2 text-xs">
      {artifacts.formula && (
        <div className="rounded-lg border border-border/70 p-3 bg-muted/20">
          <span className="text-muted-foreground block text-[11px] mb-1 font-semibold">
            Learned Model Equation
          </span>
          <pre className="font-mono text-xs text-primary whitespace-pre-wrap overflow-x-auto">
            {artifacts.formula}
          </pre>
        </div>
      )}

      {artifacts.coefficients && artifacts.coefficients.length > 0 && (
        <ArtifactCoefficientsList
          coefficients={artifacts.coefficients}
          title={getCoefficientsTitle(model.algorithm)}
        />
      )}

      {artifacts.classes && (
        <div className="rounded-lg border border-border/70 p-2.5 bg-muted/10">
          <span className="text-muted-foreground block text-[11px] mb-1.5">
            Class Labels
          </span>
          <div className="flex flex-wrap gap-1.5">
            {artifacts.classes.map((cls) => (
              <Badge
                key={cls}
                variant="secondary"
                className="font-mono text-xs"
              >
                {cls}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

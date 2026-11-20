import { Play, RotateCcw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SavedModel } from "@/types/savedModel";
import { useModelPredictForm } from "./predict/useModelPredictForm";
import { PredictResultBanner } from "./predict/PredictResultBanner";
import { PredictFeatureInputs } from "./predict/PredictFeatureInputs";

export function ModelPredictTab({ model }: { model: SavedModel }) {
  const form = useModelPredictForm(model);

  if (form.features.length === 0) {
    return (
      <p className="text-xs text-muted-foreground py-4">
        No feature metadata recorded for this model to run predictions.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4 py-2 text-xs">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-semibold text-sm flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-primary" />
            Interactive Inference Playground
          </h4>
          <p className="text-muted-foreground text-[11px]">
            Input custom feature values below to test live predictions.
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="sm"
            onClick={form.handleReset}
            className="h-7 text-xs px-2"
          >
            <RotateCcw className="h-3 w-3 mr-1" />
            Reset
          </Button>
          <Button
            size="sm"
            onClick={form.handlePredict}
            className="h-7 text-xs px-3 bg-primary"
          >
            <Play className="h-3 w-3 mr-1 fill-current" />
            Predict
          </Button>
        </div>
      </div>
      {form.prediction && <PredictResultBanner prediction={form.prediction} />}
      <PredictFeatureInputs
        features={form.features}
        analysisMap={form.analysisMap}
        inputs={form.inputs}
        onInputChange={form.handleInputChange}
      />
    </div>
  );
}

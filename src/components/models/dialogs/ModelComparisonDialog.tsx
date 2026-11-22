import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import type { ModelComparisonDialogProps } from "./comparison/types";
import { useModelComparison } from "./comparison/useModelComparison";
import { ModelComparisonSelectors } from "./comparison/ModelComparisonSelectors";
import { ModelComparisonTable } from "./comparison/ModelComparisonTable";

export function ModelComparisonDialog({
  open,
  onClose,
  models,
}: ModelComparisonDialogProps) {
  const {
    modelA,
    modelB,
    modelCId,
    activeModels,
    setModelAId,
    setModelBId,
    setModelCId,
  } = useModelComparison(models);

  if (models.length < 2) return null;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">
            Model Comparison Matrix
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Side-by-side comparison of architecture, dataset split,
            hyperparameters, and performance metrics.
          </DialogDescription>
        </DialogHeader>

        <ModelComparisonSelectors
          models={models}
          modelA={modelA}
          modelB={modelB}
          modelCId={modelCId}
          onSelectA={setModelAId}
          onSelectB={setModelBId}
          onSelectC={setModelCId}
        />

        <ModelComparisonTable models={activeModels} />
      </DialogContent>
    </Dialog>
  );
}

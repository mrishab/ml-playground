import { useMemo } from "react";
import { DataTable } from "@/components/ui/data-table";
import type { ClassificationMetrics } from "@/types/classification";
import {
  CLASSIFICATION_PREDICTION_COLUMNS,
  type ClassificationPredictionRow,
} from "./classificationPredictionColumns";

export function ClassificationPredictionsTable({
  metrics,
}: {
  metrics: ClassificationMetrics;
}) {
  const data = useMemo<ClassificationPredictionRow[]>(() => {
    const actuals = metrics.actuals ?? [];
    const preds = metrics.predictions ?? [];
    return actuals.map((actual, i) => ({
      index: i + 1,
      actual: String(actual),
      predicted: String(preds[i] ?? ""),
      isCorrect: String(actual) === String(preds[i] ?? ""),
    }));
  }, [metrics.actuals, metrics.predictions]);

  return <DataTable columns={CLASSIFICATION_PREDICTION_COLUMNS} data={data} />;
}

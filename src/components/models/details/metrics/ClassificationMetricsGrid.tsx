import type { ClassificationMetrics } from "@/types/classification";
import { MetricBox } from "../MetricBox";

export function ClassificationMetricsGrid({
  cls,
}: {
  cls: ClassificationMetrics;
}) {
  const f1 = (cls.weightedF1 ?? cls.macroF1) as number;
  const prec = (cls.weightedPrecision ?? cls.macroPrecision) as number;
  const rec = (cls.weightedRecall ?? cls.macroRecall) as number;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
      <MetricBox label="Accuracy" val={`${(cls.accuracy * 100).toFixed(1)}%`} />
      <MetricBox label="Weighted F1" val={`${(f1 * 100).toFixed(1)}%`} />
      <MetricBox label="Macro F1" val={`${(cls.macroF1 * 100).toFixed(1)}%`} />
      <MetricBox label="Precision" val={`${(prec * 100).toFixed(1)}%`} />
      <MetricBox label="Recall" val={`${(rec * 100).toFixed(1)}%`} />
    </div>
  );
}

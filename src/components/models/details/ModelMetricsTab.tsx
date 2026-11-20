import type { SavedModel } from "@/types/savedModel";
import { RegressionMetricsGrid } from "./metrics/RegressionMetricsGrid";
import { ClassificationMetricsGrid } from "./metrics/ClassificationMetricsGrid";
import { KMeansMetricsGrid } from "./metrics/KMeansMetricsGrid";
import { IsolationForestMetricsGrid } from "./metrics/IsolationForestMetricsGrid";
import { PCAMetricsGrid } from "./metrics/PCAMetricsGrid";

export function ModelMetricsTab({ model }: { model: SavedModel }) {
  const {
    regressionMetrics: reg,
    classificationMetrics: cls,
    kmeansMetrics: km,
    isolationForestMetrics: iso,
    pcaMetrics: pca,
  } = model;

  return (
    <div className="flex flex-col gap-3 py-2 text-xs">
      {reg && <RegressionMetricsGrid reg={reg} />}
      {cls && <ClassificationMetricsGrid cls={cls} />}
      {km && <KMeansMetricsGrid km={km} />}
      {iso && <IsolationForestMetricsGrid iso={iso} />}
      {pca && <PCAMetricsGrid pca={pca} />}
    </div>
  );
}

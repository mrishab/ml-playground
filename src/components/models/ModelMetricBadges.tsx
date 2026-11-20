import { Badge } from "@/components/ui/badge";
import type { SavedModel } from "@/types/savedModel";

function getModelBadges(model: SavedModel): { key: string; text: string }[] {
  const b: { key: string; text: string }[] = [];
  const {
    regressionMetrics: reg,
    classificationMetrics: cls,
    kmeansMetrics: km,
    isolationForestMetrics: iso,
  } = model;

  if (reg) {
    b.push({
      key: "r2",
      text: `R²: ${Number.isFinite(reg.rSquared) ? reg.rSquared.toFixed(3) : "—"}`,
    });
    b.push({
      key: "mse",
      text: `MSE: ${Number.isFinite(reg.mse) ? reg.mse.toFixed(4) : "—"}`,
    });
  }
  if (cls) {
    const f1 = cls.weightedF1 ?? cls.macroF1;
    b.push({
      key: "acc",
      text: `Acc: ${Number.isFinite(cls.accuracy) ? (cls.accuracy * 100).toFixed(1) + "%" : "—"}`,
    });
    b.push({
      key: "f1",
      text: `F1: ${Number.isFinite(f1) ? (Number(f1) * 100).toFixed(1) + "%" : "—"}`,
    });
  }
  if (km) {
    b.push({ key: "k", text: `k = ${km.k}` });
    b.push({
      key: "inertia",
      text: `Inertia: ${Number.isFinite(km.inertia) ? km.inertia.toFixed(1) : "—"}`,
    });
  }
  if (iso) {
    b.push({ key: "anom", text: `Anomalies: ${iso.anomalyCount}` });
    b.push({
      key: "thresh",
      text: `Thresh: ${Number.isFinite(iso.thresholdScore) ? iso.thresholdScore.toFixed(3) : "—"}`,
    });
  }
  return b;
}

export function ModelMetricBadges({ model }: { model: SavedModel }) {
  const badges = getModelBadges(model);
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {badges.map((b) => (
        <Badge key={b.key} variant="secondary" className="text-xs font-mono">
          {b.text}
        </Badge>
      ))}
    </div>
  );
}

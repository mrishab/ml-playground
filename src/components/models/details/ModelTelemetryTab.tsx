import type { SavedModel } from "@/types/savedModel";
import { TelemetrySummaryCards } from "./TelemetrySummaryCards";
import { TelemetryHistoryTable } from "./TelemetryHistoryTable";

export function ModelTelemetryTab({ model }: { model: SavedModel }) {
  const history = model.lossHistory ?? [];

  if (history.length === 0) {
    return (
      <p className="text-xs text-muted-foreground py-4">
        No training telemetry was recorded for this model.
      </p>
    );
  }

  const initialLoss = history[0]?.loss ?? 0;
  const finalLoss = history[history.length - 1]?.loss ?? 0;

  return (
    <div className="flex flex-col gap-3 py-2 text-xs">
      <TelemetrySummaryCards
        steps={history.length}
        initialLoss={initialLoss}
        finalLoss={finalLoss}
      />
      <TelemetryHistoryTable history={history} />
    </div>
  );
}

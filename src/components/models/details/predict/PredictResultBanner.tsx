import { Badge } from "@/components/ui/badge";
import type { PredictionResult } from "./predictModel";

export function PredictResultBanner({
  prediction,
}: {
  prediction: PredictionResult;
}) {
  return (
    <div className="rounded-lg border border-primary/30 bg-primary/5 p-3.5 flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-medium text-muted-foreground">
          {prediction.label}
        </span>
        {prediction.confidence && (
          <Badge variant="secondary" className="text-[10px] font-mono">
            {prediction.confidence}
          </Badge>
        )}
      </div>
      <div className="text-2xl font-bold font-mono text-foreground tracking-tight">
        {prediction.predictedValue}
      </div>
      {prediction.details && (
        <p className="text-[11px] text-muted-foreground font-mono">
          {prediction.details}
        </p>
      )}
    </div>
  );
}

import { useMemo } from "react";
import Plot from "react-plotly.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buildActualVsPredTraces } from "./actualVsPredTraces";
import { getResidualsBaseLayout } from "./residualsLayout";

export function ActualVsPredictedCard({
  actuals,
  predictions,
}: {
  actuals: number[];
  predictions: number[];
}) {
  const traces = useMemo(
    () => buildActualVsPredTraces(actuals, predictions),
    [actuals, predictions],
  );
  const layout = useMemo(
    () => getResidualsBaseLayout("Predicted (ŷ)", "Actual (y)"),
    [],
  );

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold">
          Actual vs. Predicted
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          Points close to the dashed diagonal indicate accurate predictions.
        </p>
      </CardHeader>
      <CardContent>
        <Plot
          data={traces}
          layout={layout}
          config={{ displayModeBar: false, responsive: true }}
          useResizeHandler
          className="w-full"
        />
      </CardContent>
    </Card>
  );
}

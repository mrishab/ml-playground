import { useMemo } from "react";
import Plot from "react-plotly.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buildResidualsTraces } from "./residualsTraces";
import { getResidualsBaseLayout } from "./residualsLayout";

export function ResidualsVsFittedCard({
  predictions,
  residuals,
}: {
  predictions: number[];
  residuals: number[];
}) {
  const traces = useMemo(
    () => buildResidualsTraces(predictions, residuals),
    [predictions, residuals],
  );
  const layout = useMemo(
    () => getResidualsBaseLayout("Fitted Values (ŷ)", "Residual (y - ŷ)"),
    [],
  );

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold">
          Residuals vs. Fitted (Predicted)
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          Random scatter around zero indicates homoscedasticity without
          non-linear bias.
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

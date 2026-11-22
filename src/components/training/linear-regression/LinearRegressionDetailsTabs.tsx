import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { RegressionMetrics } from "@/types/regression";
import { PredictionsTable } from "./PredictionsTable";
import { ResidualsPlot } from "./ResidualsPlot";
import { MSEBreakdown } from "./MSEBreakdown";
import { RSEBreakdown } from "./RSEBreakdown";
import { RSquaredBreakdown } from "./RSquaredBreakdown";
import { useRegressionActiveModel } from "./tabs/useRegressionActiveModel";
import { RegressionModelTabContent } from "./tabs/RegressionModelTabContent";

export function LinearRegressionDetailsTabs({
  metrics,
}: {
  metrics: RegressionMetrics;
}) {
  const model = useRegressionActiveModel();

  return (
    <Tabs defaultValue="predictions" className="w-full">
      <TabsList className="flex flex-wrap h-auto gap-1">
        <TabsTrigger value="predictions">Predictions</TabsTrigger>
        <TabsTrigger value="residuals">Residuals</TabsTrigger>
        <TabsTrigger value="parameters">Equation & Coeffs</TabsTrigger>
        <TabsTrigger value="playground">Playground</TabsTrigger>
        <TabsTrigger value="mse">MSE</TabsTrigger>
        <TabsTrigger value="rse">RSE</TabsTrigger>
        <TabsTrigger value="rsquared">R²</TabsTrigger>
      </TabsList>
      <TabsContent value="predictions">
        <PredictionsTable metrics={metrics} />
      </TabsContent>
      <TabsContent value="residuals">
        <ResidualsPlot metrics={metrics} />
      </TabsContent>
      <RegressionModelTabContent model={model} />
      <TabsContent value="mse">
        <MSEBreakdown metrics={metrics} />
      </TabsContent>
      <TabsContent value="rse">
        <RSEBreakdown metrics={metrics} />
      </TabsContent>
      <TabsContent value="rsquared">
        <RSquaredBreakdown metrics={metrics} />
      </TabsContent>
    </Tabs>
  );
}

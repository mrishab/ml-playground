import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PCAScreePlot } from "./PCAScreePlot";
import { PCAProjectionPlot } from "./PCAProjectionPlot";
import { PCALoadingsTable } from "./PCALoadingsTable";
import type { PCAMetrics } from "@/types/pca";

export function PCADetailsTabs({ metrics }: { metrics: PCAMetrics }) {
  return (
    <div className="space-y-4">
      <Tabs defaultValue="scree" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="scree">Scree Plot</TabsTrigger>
          <TabsTrigger value="projection">2D Projection</TabsTrigger>
          <TabsTrigger value="loadings">Loadings</TabsTrigger>
        </TabsList>
        <TabsContent value="scree" className="pt-2">
          <PCAScreePlot metrics={metrics} />
        </TabsContent>
        <TabsContent value="projection" className="pt-2">
          <PCAProjectionPlot metrics={metrics} />
        </TabsContent>
        <TabsContent value="loadings" className="pt-2">
          <PCALoadingsTable metrics={metrics} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

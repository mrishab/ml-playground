import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ConfusionMatrix } from "./ConfusionMatrix";
import { AccuracyBreakdown } from "./AccuracyBreakdown";
import { PrecisionRecallBreakdown } from "./PrecisionRecallBreakdown";
import { F1ScoreBreakdown } from "./F1ScoreBreakdown";
import { ROCCurve } from "./ROCCurve";
import { ClassificationPredictionsTable } from "./ClassificationPredictionsTable";
import { useClassificationActiveModel } from "./tabs/useClassificationActiveModel";
import { ClassificationModelTabContent } from "./tabs/ClassificationModelTabContent";
import type { ClassificationMetrics } from "@/types/classification";

export function ClassificationDetailsTabs({
  metrics,
}: {
  metrics: ClassificationMetrics;
}) {
  const model = useClassificationActiveModel();

  return (
    <Tabs defaultValue="predictions" className="w-full">
      <TabsList className="flex flex-wrap h-auto gap-1">
        <TabsTrigger value="predictions">Predictions</TabsTrigger>
        <TabsTrigger value="parameters">Parameters</TabsTrigger>
        <TabsTrigger value="playground">Playground</TabsTrigger>
        <TabsTrigger value="confusion">Confusion Matrix</TabsTrigger>
        <TabsTrigger value="accuracy">Accuracy</TabsTrigger>
        <TabsTrigger value="precision-recall">Precision & Recall</TabsTrigger>
        <TabsTrigger value="f1">F1-Score</TabsTrigger>
        <TabsTrigger value="roc">ROC & AUC</TabsTrigger>
      </TabsList>
      <TabsContent value="predictions">
        <ClassificationPredictionsTable metrics={metrics} />
      </TabsContent>
      <ClassificationModelTabContent model={model} />
      <TabsContent value="confusion">
        <ConfusionMatrix metrics={metrics} />
      </TabsContent>
      <TabsContent value="accuracy">
        <AccuracyBreakdown metrics={metrics} />
      </TabsContent>
      <TabsContent value="precision-recall">
        <PrecisionRecallBreakdown metrics={metrics} />
      </TabsContent>
      <TabsContent value="f1">
        <F1ScoreBreakdown metrics={metrics} />
      </TabsContent>
      <TabsContent value="roc">
        <ROCCurve metrics={metrics} />
      </TabsContent>
    </Tabs>
  );
}

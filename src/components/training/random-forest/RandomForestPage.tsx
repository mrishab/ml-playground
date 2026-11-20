import { Trees } from "lucide-react";
import { TrainingPageLayout } from "@/components/shared/TrainingPageLayout";
import { RandomForestConfigCard } from "./RandomForestConfigCard";
import { FeatureImportanceCard } from "./FeatureImportanceCard";
import { useRandomForestPage } from "./useRandomForestPage";
import { RandomForestSummary, RandomForestDetails } from "./RandomForestViews";
import { RF_NEXT_STEP, getRFConfigOptions } from "./randomForestConstants";

export function RandomForestPage() {
  const p = useRandomForestPage();
  const isReg = p.problemType === "regression";
  const metrics = isReg ? p.regressionMetrics : p.classificationMetrics;

  return (
    <TrainingPageLayout
      {...p}
      title="Random Forest"
      subtitle={
        isReg ? "Ensemble bootstrap regressor" : "Ensemble bootstrap classifier"
      }
      icon={Trees}
      algorithmName="Random Forest"
      metrics={metrics}
      configOptions={getRFConfigOptions(p.nEstimators, p.maxDepth)}
      headerExtras={
        <RandomForestConfigCard
          nEstimators={p.nEstimators}
          maxDepth={p.maxDepth}
          onChange={p.setParams}
          disabled={p.trainingState === "training"}
        />
      }
      summaryComponent={
        <RandomForestSummary
          isReg={isReg}
          regressionMetrics={p.regressionMetrics}
          classificationMetrics={p.classificationMetrics}
        />
      }
      detailsComponent={
        <RandomForestDetails
          isReg={isReg}
          regressionMetrics={p.regressionMetrics}
          classificationMetrics={p.classificationMetrics}
        />
      }
      footerExtras={<FeatureImportanceCard importances={p.importances} />}
      nextStepProps={RF_NEXT_STEP}
      onRun={p.runTraining}
      onReset={p.reset}
    />
  );
}

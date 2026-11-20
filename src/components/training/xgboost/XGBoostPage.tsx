import { Zap } from "lucide-react";
import { TrainingPageLayout } from "@/components/shared/TrainingPageLayout";
import { XGBoostConfigCard } from "./XGBoostConfigCard";
import { XGBoostSummary, XGBoostDetails } from "./XGBoostViews";
import { FeatureImportanceCard } from "../random-forest/FeatureImportanceCard";
import { useXGBoostPage } from "./useXGBoostPage";
import { XGBOOST_NEXT_STEP, getXGBoostConfigOptions } from "./xgboostConstants";

export function XGBoostPage() {
  const p = useXGBoostPage();
  const isReg = p.problemType === "regression";
  const metrics = isReg ? p.regressionMetrics : p.classificationMetrics;

  return (
    <TrainingPageLayout
      {...p}
      title="XGBoost"
      subtitle={
        isReg
          ? "Gradient boosted tree regressor"
          : "Gradient boosted tree classifier"
      }
      icon={Zap}
      algorithmName="XGBoost"
      metrics={metrics}
      configOptions={getXGBoostConfigOptions(p.nEstimators, p.maxDepth)}
      headerExtras={
        <XGBoostConfigCard
          nEstimators={p.nEstimators}
          maxDepth={p.maxDepth}
          onChange={p.setParams}
          disabled={p.trainingState === "training"}
        />
      }
      summaryComponent={
        <XGBoostSummary
          isReg={isReg}
          regressionMetrics={p.regressionMetrics}
          classificationMetrics={p.classificationMetrics}
        />
      }
      detailsComponent={
        <XGBoostDetails
          isReg={isReg}
          regressionMetrics={p.regressionMetrics}
          classificationMetrics={p.classificationMetrics}
        />
      }
      footerExtras={<FeatureImportanceCard importances={p.importances} />}
      nextStepProps={XGBOOST_NEXT_STEP}
      onRun={p.runTraining}
      onReset={p.reset}
    />
  );
}

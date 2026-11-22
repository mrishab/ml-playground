import { Sparkles } from "lucide-react";
import { TrainingPageLayout } from "@/components/shared/TrainingPageLayout";
import { usePCAPage } from "./usePCAPage";
import { PCAConfigCard } from "./PCAConfigCard";
import { PCASummaryCards } from "./PCASummaryCards";
import { PCADetailsTabs } from "./PCADetailsTabs";

export function PCAPage() {
  const pageState = usePCAPage();
  const { metrics, nComponents, setNComponents, standardize, setStandardize } =
    pageState;

  return (
    <TrainingPageLayout
      {...pageState}
      canTrain={pageState.canTrainUnsupervised}
      isUnsupervised={true}
      title="Principal Component Analysis"
      subtitle="Unsupervised dimensionality reduction and orthogonal variance decomposition"
      icon={Sparkles}
      algorithmName="Principal Component Analysis (PCA)"
      configOptions={[
        { label: "Components (k)", value: String(nComponents) },
        { label: "Standardized", value: standardize ? "Yes" : "No" },
        { label: "Decomposition", value: "Covariance Eigen" },
      ]}
      headerExtras={
        <PCAConfigCard
          nComponents={nComponents}
          onNComponentsChange={setNComponents}
          standardize={standardize}
          onStandardizeChange={setStandardize}
          maxComponents={
            pageState.unsupervisedFeatureNames?.length ??
            pageState.featureNames?.length ??
            5
          }
          disabled={pageState.trainingState === "training"}
        />
      }
      summaryComponent={<PCASummaryCards metrics={metrics!} />}
      detailsComponent={<PCADetailsTabs metrics={metrics!} />}
      nextStepProps={{
        message: "PCA projection complete.",
        linkTo: "/models",
        linkText: "Manage Saved Models",
      }}
      onRun={pageState.runTraining}
      onReset={pageState.reset}
    />
  );
}

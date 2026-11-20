import { Users } from "lucide-react";
import { TrainingPageLayout } from "@/components/shared/TrainingPageLayout";
import { KSelector } from "./KSelector";
import { useKNNPage } from "./useKNNPage";
import { KNNSummary, KNNDetails } from "./KNNResultViews";

export function KNNPage() {
  const pageState = useKNNPage();
  const { k, setK, effectiveMaxK, trainingState, isReg } = pageState;

  return (
    <TrainingPageLayout
      {...pageState}
      title="K-Nearest Neighbors"
      subtitle={
        isReg ? "Instance-based regression model" : "Instance-based classifier"
      }
      icon={Users}
      algorithmName={
        isReg ? "K-Nearest Neighbors (Regressor)" : "K-Nearest Neighbors"
      }
      configOptions={[
        { label: "Task", value: isReg ? "Regression" : "Classification" },
        { label: "K (Neighbors)", value: String(k) },
        { label: "Distance Metric", value: "Euclidean" },
      ]}
      headerExtras={
        <KSelector
          k={k}
          onKChange={setK}
          maxK={effectiveMaxK}
          disabled={trainingState === "training"}
        />
      }
      summaryComponent={<KNNSummary pageState={pageState} />}
      detailsComponent={<KNNDetails pageState={pageState} />}
      nextStepProps={{
        message: "Model training complete.",
        linkTo: "/models",
        linkText: "Manage Saved Models",
      }}
      onRun={pageState.runTraining}
      onReset={pageState.reset}
    />
  );
}

import { BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PageLayout } from "@/components/shared/PageLayout";
import { PrerequisiteGate } from "@/components/pipeline/PrerequisiteGate";
import { StaleWarningBanner } from "@/components/pipeline/StaleWarningBanner";
import { usePipelineSteps } from "@/hooks/usePipelineSteps";
import { usePipelineStore } from "@/stores/pipeline";
import { FeatureTabs } from "./FeatureTabs";
import { useVisualizePage } from "./useVisualizePage";
import { useVisualizeTabs } from "./useVisualizeTabs";

export function VisualizePage() {
  const v = useVisualizePage();
  const navigate = useNavigate();
  const { steps, defaultTrainRoute, isDownstreamStale } = usePipelineSteps();
  const revertExploreChanges = usePipelineStore((s) => s.revertExploreChanges);
  const tabs = useVisualizeTabs(v);
  const step3 = steps[2];

  if (!v.isSplit) {
    return (
      <PageLayout
        icon={BarChart3}
        title="Feature Analysis"
        subtitle="Scatter plots, correlations, and density heatmaps"
      >
        <PrerequisiteGate step={step3} />
      </PageLayout>
    );
  }

  const count = v.featureNames.length;

  return (
    <PageLayout
      icon={BarChart3}
      title="Feature Analysis"
      subtitle={`${count} feature${count > 1 ? "s" : ""} vs ${v.targetColumn} (${v.problemType ?? "regression"})`}
      primaryAction={{
        label: "Proceed to Model Training",
        linkTo: defaultTrainRoute,
      }}
    >
      {isDownstreamStale && (
        <div className="mb-4">
          <StaleWarningBanner
            title="Split Settings Changed"
            message="Data split settings were modified after this analysis was prepared. Plots reflect the previous split."
            onRevert={revertExploreChanges}
            revertLabel="Revert Split"
            onRecompute={() => navigate("/pretrain/explore")}
            recomputeLabel="Re-split Data"
          />
        </div>
      )}
      <FeatureTabs tabs={tabs} />
    </PageLayout>
  );
}

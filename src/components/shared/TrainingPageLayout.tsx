import { PageLayout } from "./PageLayout";
import { usePipelineSteps } from "@/hooks/usePipelineSteps";
import { TrainingStaleBanner } from "./training-layout/TrainingStaleBanner";
import { TrainingConfigGrid } from "./training-layout/TrainingConfigGrid";
import { TrainingIdleCard } from "./training-layout/TrainingIdleCard";
import { TrainingErrorCard } from "./training-layout/TrainingErrorCard";
import { deriveTrainingAction } from "./training-layout/action";
import { TrainingLossCard } from "@/components/training/loss-plot/TrainingLossCard";
import { AlgorithmNav } from "./training-layout/AlgorithmNav";
import { PreviousRunDeltaBadge } from "./training-layout/PreviousRunDeltaBadge";
import { TrainingGateFallback } from "./training-layout/TrainingGateFallback";
import type { TrainingPageLayoutProps } from "./training-layout/types";

export type { TrainingPageLayoutProps };

export function TrainingPageLayout(props: TrainingPageLayoutProps) {
  const { steps, isDownstreamStale } = usePipelineSteps();
  const isBlocked = props.isUnsupervised ? !props.canTrain : !props.isSplit;

  if (isBlocked) {
    const step = props.isUnsupervised
      ? (steps.find((s) => s.id === 1) ?? steps[0])
      : (steps.find((s) => s.id === 4) ?? steps[3]);
    return <TrainingGateFallback props={props} step={step} />;
  }

  const action = deriveTrainingAction(
    props.metrics,
    props.trainingState,
    props.canTrain,
    props.nextStepProps,
    props.onRun,
  );

  return (
    <PageLayout
      icon={props.icon}
      title={props.title}
      subtitle={props.subtitle}
      primaryAction={action}
    >
      <AlgorithmNav />
      <TrainingStaleBanner
        isStale={isDownstreamStale}
        hasMetrics={Boolean(props.metrics)}
        onRun={props.onRun}
      />
      <TrainingErrorCard error={props.error} />
      {Boolean(props.metrics) && <PreviousRunDeltaBadge />}
      <TrainingConfigGrid {...props} />
      {Boolean(props.lossTelemetry?.history?.length) && (
        <TrainingLossCard telemetry={props.lossTelemetry} />
      )}
      {props.metrics ? props.detailsComponent : null}
      {props.footerExtras}
      {props.trainingState === "idle" && !props.metrics && <TrainingIdleCard />}
    </PageLayout>
  );
}

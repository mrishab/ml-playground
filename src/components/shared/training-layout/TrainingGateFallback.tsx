import { PageLayout } from "../PageLayout";
import { PrerequisiteGate } from "@/components/pipeline/PrerequisiteGate";
import type { TrainingPageLayoutProps } from "./types";
import type { PipelineStepInfo } from "@/stores/pipeline";

export function TrainingGateFallback({
  props,
  step,
}: {
  props: TrainingPageLayoutProps;
  step?: PipelineStepInfo;
}) {
  return (
    <PageLayout icon={props.icon} title={props.title} subtitle={props.subtitle}>
      {step && <PrerequisiteGate step={step} />}
    </PageLayout>
  );
}

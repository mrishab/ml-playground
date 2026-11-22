import { createTelemetryUpdater } from "@/components/training/shared/createTelemetryUpdater";
import type { LossTelemetry } from "@/types/loss";

export const XGBOOST_NEXT_STEP = {
  message: "Training complete.",
  linkTo: "/models",
  linkText: "Saved Models",
};

export const getXGBoostConfigOptions = (n: number, d: number) => [
  { label: "Rounds", value: String(n) },
  { label: "Max Depth", value: String(d) },
  { label: "Learning Rate", value: "0.1" },
];

export function createXGBoostStepUpdater(
  isReg: boolean,
  setTelemetry: (t: LossTelemetry | null) => void,
  nEstimators: number,
) {
  return createTelemetryUpdater(
    isReg ? "regression" : "classification",
    isReg ? "Train vs Test MSE" : "Train vs Test Error Rate",
    isReg ? "MSE" : "Error Rate",
    setTelemetry,
    undefined,
    undefined,
    nEstimators,
  );
}

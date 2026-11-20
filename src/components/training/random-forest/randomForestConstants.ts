import { createTelemetryUpdater } from "@/components/training/shared/createTelemetryUpdater";
import type { LossTelemetry } from "@/types/loss";

export const RF_NEXT_STEP = {
  message: "Training complete.",
  linkTo: "/models",
  linkText: "Saved Models",
};

export const getRFConfigOptions = (n: number, d: number) => [
  { label: "Trees", value: String(n) },
  { label: "Max Depth", value: String(d) },
];

export function createRFStepUpdater(
  isReg: boolean,
  setTelemetry: (t: LossTelemetry | null) => void,
  nEstimators: number,
) {
  return createTelemetryUpdater(
    isReg ? "regression" : "classification",
    isReg ? "Out-of-Bag / Test MSE" : "Ensemble Misclassification Loss",
    isReg ? "MSE" : "Error Rate",
    setTelemetry,
    isReg ? "R² Fit (%)" : "Accuracy (%)",
    "%",
    nEstimators,
  );
}

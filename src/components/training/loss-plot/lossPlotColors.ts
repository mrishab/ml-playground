import type { AlgorithmKind } from "@/types/loss";

export type Palette = {
  primary: string;
  fill: string;
  secondary: string;
  val: string;
};

export const COLOR_PALETTES = {
  regression: {
    primary: "var(--color-primary)",
    fill: "var(--color-primary)",
    secondary: "var(--color-chart-3)",
    val: "var(--color-warning)",
  },
  classification: {
    primary: "var(--color-success)",
    fill: "var(--color-success)",
    secondary: "var(--color-chart-3)",
    val: "var(--color-chart-5)",
  },
  clustering: {
    primary: "var(--color-danger)",
    fill: "var(--color-danger)",
    secondary: "var(--color-chart-2)",
    val: "var(--color-chart-4)",
  },
  anomaly: {
    primary: "var(--color-chart-4)",
    fill: "var(--color-chart-4)",
    secondary: "var(--color-chart-4)",
    val: "var(--color-warning)",
  },
} as const satisfies Record<AlgorithmKind, Palette>;

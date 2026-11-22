import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import type { SavedModel } from "@/types/savedModel";

export interface ArchField {
  label: string;
  render: (m: SavedModel) => ReactNode;
}

export const ARCH_FIELDS: ArchField[] = [
  {
    label: "Algorithm",
    render: (m) => (
      <span className="font-mono font-semibold">{m.algorithmName}</span>
    ),
  },
  { label: "Dataset", render: (m) => m.datasetName },
  {
    label: "Problem Type",
    render: (m) => (
      <Badge variant="outline" className="text-[10px] capitalize">
        {m.problemType}
      </Badge>
    ),
  },
  {
    label: "Target Variable",
    render: (m) => (
      <span className="font-mono">
        {m.splitConfig.targetColumn || "None (Unsupervised)"}
      </span>
    ),
  },
  {
    label: "Features Evaluated",
    render: (m) => `${m.splitConfig.features.length} features`,
  },
  {
    label: "Train / Test Samples",
    render: (m) => (
      <span className="font-mono">
        {m.splitConfig.trainSamples} train / {m.splitConfig.testSamples} test
      </span>
    ),
  },
];

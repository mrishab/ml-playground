import type { SavedModel } from "@/types/savedModel";
import { ModelComparisonArchRows } from "./ModelComparisonArchRows";
import { ModelComparisonRegressionRows } from "./ModelComparisonRegressionRows";
import { ModelComparisonClassificationRows } from "./ModelComparisonClassificationRows";
import { ModelComparisonUnsupervisedRows } from "./ModelComparisonUnsupervisedRows";
import { ModelComparisonHyperparametersRows } from "./ModelComparisonHyperparametersRows";

export function ModelComparisonTable({ models }: { models: SavedModel[] }) {
  return (
    <div className="border border-border/80 rounded-lg overflow-x-auto text-xs">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-muted/40 border-b border-border/80">
            <th className="p-2.5 text-left font-semibold text-muted-foreground w-1/4">
              Attribute / Metric
            </th>
            {models.map((m, idx) => (
              <th key={m.id} className="p-2.5 text-left font-semibold">
                <div className="font-bold text-foreground">
                  {`Model ${idx + 1}`}
                </div>
                <div className="text-[11px] text-muted-foreground truncate max-w-[200px]">
                  {m.name}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border/60">
          <ModelComparisonArchRows models={models} />
          <tr className="bg-muted/15 font-semibold">
            <td colSpan={models.length + 1} className="p-2 text-foreground">
              Evaluation Metrics
            </td>
          </tr>
          <ModelComparisonRegressionRows models={models} />
          <ModelComparisonClassificationRows models={models} />
          <ModelComparisonUnsupervisedRows models={models} />
          <ModelComparisonHyperparametersRows models={models} />
        </tbody>
      </table>
    </div>
  );
}

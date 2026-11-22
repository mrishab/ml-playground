import type { SavedModel } from "@/types/savedModel";

export function ModelComparisonHyperparametersRows({
  models,
}: {
  models: SavedModel[];
}) {
  return (
    <>
      <tr className="bg-muted/15 font-semibold">
        <td colSpan={models.length + 1} className="p-2 text-foreground">
          Hyperparameters
        </td>
      </tr>
      <tr>
        <td className="p-2 font-medium text-muted-foreground">
          Configured Settings
        </td>
        {models.map((m) => (
          <td key={m.id} className="p-2 font-mono text-[11px]">
            <div className="space-y-0.5">
              {Object.entries(m.hyperparameters).map(([k, v]) => (
                <div key={k}>
                  <span className="text-muted-foreground">{k}:</span>{" "}
                  <span className="text-foreground">{String(v)}</span>
                </div>
              ))}
            </div>
          </td>
        ))}
      </tr>
    </>
  );
}

import type { SavedModel } from "@/types/savedModel";
import { ARCH_FIELDS } from "./comparisonArchFields";

export function ModelComparisonArchRows({ models }: { models: SavedModel[] }) {
  return (
    <>
      {ARCH_FIELDS.map(({ label, render }) => (
        <tr key={label}>
          <td className="p-2 font-medium text-muted-foreground">{label}</td>
          {models.map((m) => (
            <td key={m.id} className="p-2">
              {render(m)}
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

import type { PCAComponent } from "@/types/pca";

interface PCALoadingsRowProps {
  feat: string;
  topComps: PCAComponent[];
}

export function PCALoadingsRow({ feat, topComps }: PCALoadingsRowProps) {
  return (
    <tr className="border-b border-border/40 hover:bg-muted/30">
      <td className="py-1.5 px-2 font-medium">{feat}</td>
      {topComps.map((c) => {
        const l = c.loadings.find((item) => item.feature === feat);
        const weight = l?.weight ?? 0;
        const isHighlight = Math.abs(weight) > 0.35;
        return (
          <td
            key={c.name}
            className={`py-1.5 px-2 font-mono ${
              isHighlight ? "font-bold text-primary" : "text-muted-foreground"
            }`}
          >
            {weight >= 0 ? `+${weight.toFixed(3)}` : weight.toFixed(3)}
          </td>
        );
      })}
    </tr>
  );
}

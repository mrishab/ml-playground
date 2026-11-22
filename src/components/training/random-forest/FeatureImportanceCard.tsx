import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  importances: { feature: string; score: number }[];
  title?: string;
};

export function FeatureImportanceCard({
  importances,
  title = "Feature Importances (Gini/Variance Reduction)",
}: Props) {
  if (importances.length === 0) return null;
  const sorted = [...importances].sort((a, b) => b.score - a.score);
  const maxScore = Math.max(0.01, ...sorted.map((i) => i.score));

  return (
    <Card className="mt-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {sorted.map(({ feature, score }) => {
          const pct = Math.round((score / maxScore) * 100);
          return (
            <div key={feature} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-medium truncate">{feature}</span>
                <span className="font-mono text-muted-foreground">
                  {(score * 100).toFixed(1)}%
                </span>
              </div>
              <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full w-full bg-primary rounded-full origin-left transition-transform duration-300 ease-out"
                  style={{ transform: `scaleX(${pct / 100})` }}
                />
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

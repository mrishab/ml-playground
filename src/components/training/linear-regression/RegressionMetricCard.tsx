import { Card, CardContent } from "@/components/ui/card";
import { formatNumber } from "@/lib/number";

export interface MetricItem {
  label: string;
  value: number;
  desc: string;
  badge: string;
}

export function RegressionMetricCard({ item }: { item: MetricItem }) {
  return (
    <Card className="transition-[transform,box-shadow,border-color] duration-150 ease-out hover:shadow-md hover:-translate-y-0.5">
      <CardContent className="pt-4 sm:pt-6 p-3 sm:p-6 text-center">
        <span className="inline-block px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded bg-primary/10 text-primary mb-1">
          {item.badge}
        </span>
        <p className="text-xs sm:text-sm text-muted-foreground">{item.label}</p>
        <p className="text-2xl sm:text-3xl font-bold truncate mt-0.5">
          {formatNumber(item.value)}
        </p>
        <p className="mt-1 text-[11px] sm:text-xs text-muted-foreground">
          {item.desc}
        </p>
      </CardContent>
    </Card>
  );
}

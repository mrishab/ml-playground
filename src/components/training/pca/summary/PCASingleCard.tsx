import type { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

export function PCASingleCard({
  title,
  value,
  footer,
}: {
  title: string;
  value: ReactNode;
  footer: ReactNode;
}) {
  return (
    <Card>
      <CardContent className="p-3">
        <div className="text-[11px] text-muted-foreground">{title}</div>
        <div className="mt-1 font-mono text-xl font-bold">{value}</div>
        {footer}
      </CardContent>
    </Card>
  );
}

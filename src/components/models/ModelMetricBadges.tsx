import { Badge } from "@/components/ui/badge";
import type { SavedModel } from "@/types/savedModel";
import { getModelBadges } from "./modelBadgeUtils";

export function ModelMetricBadges({ model }: { model: SavedModel }) {
  const badges = getModelBadges(model);
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {badges.map((b) => (
        <Badge key={b.key} variant="secondary" className="text-xs font-mono">
          {b.text}
        </Badge>
      ))}
    </div>
  );
}

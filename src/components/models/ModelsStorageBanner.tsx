import { HardDrive } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { SavedModel } from "@/types/savedModel";
import { ModelsStorageBadges } from "./ModelsStorageBadges";

interface StorageBannerProps {
  formattedSize: string;
  models: SavedModel[];
}

export function ModelsStorageBanner({
  formattedSize,
  models,
}: StorageBannerProps) {
  return (
    <Card className="border-border/80 bg-muted/20">
      <CardContent className="flex flex-wrap items-center justify-between gap-4 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <HardDrive className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight text-foreground font-mono">
                {formattedSize}
              </span>
              <span className="text-xs text-muted-foreground">
                storage used
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Stored locally on your device in browser localStorage
            </p>
          </div>
        </div>
        <ModelsStorageBadges models={models} />
      </CardContent>
    </Card>
  );
}

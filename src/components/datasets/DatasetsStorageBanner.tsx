import { HardDrive } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { SavedDataset } from "@/types/savedDataset";
import { DatasetsStorageBadges } from "./DatasetsStorageBadges";

interface StorageBannerProps {
  formattedSize: string;
  datasets: SavedDataset[];
}

export function DatasetsStorageBanner({
  formattedSize,
  datasets,
}: StorageBannerProps) {
  const totalRows = datasets.reduce((sum, d) => sum + d.rowCount, 0);

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
                dataset storage used
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Stored locally on your device in browser localStorage (
              {totalRows.toLocaleString()} total rows)
            </p>
          </div>
        </div>
        <DatasetsStorageBadges datasets={datasets} />
      </CardContent>
    </Card>
  );
}

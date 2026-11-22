import type { ModelsHeaderProps } from "./header/modelsHeaderTypes";
import { ModelsHeaderActions } from "./header/ModelsHeaderActions";

export function ModelsPageHeader(p: ModelsHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
          Saved Models & Analysis
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
          Manage, inspect, download, and delete trained models in local storage
        </p>
      </div>
      <ModelsHeaderActions {...p} />
    </div>
  );
}

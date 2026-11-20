import { AlertTriangle, RefreshCw, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ModelsErrorFallbackProps {
  errorMessage: string;
  onClearAndReload: () => void;
  onReset: () => void;
}

export function ModelsErrorFallback({
  errorMessage,
  onClearAndReload,
  onReset,
}: ModelsErrorFallbackProps) {
  return (
    <div className="flex flex-1 items-center justify-center p-4 min-h-[50vh]">
      <div className="max-w-md w-full rounded-xl border border-destructive/30 bg-card p-6 shadow-lg text-center space-y-4">
        <div className="mx-auto size-12 rounded-full bg-destructive/10 text-destructive flex items-center justify-center">
          <AlertTriangle className="size-6" />
        </div>
        <div className="space-y-1.5">
          <h2 className="text-lg font-bold tracking-tight">
            Model Hub Recovery Needed
          </h2>
          <p className="text-xs text-muted-foreground">
            A corrupt or incompatible model entry in browser localStorage caused
            a rendering failure.
          </p>
        </div>
        <div className="rounded-lg bg-muted/50 p-2.5 text-left border border-border/60">
          <p className="text-[11px] font-mono text-muted-foreground break-words line-clamp-3">
            {errorMessage}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 pt-2">
          <Button
            variant="destructive"
            size="sm"
            onClick={onClearAndReload}
            className="flex-1 text-xs gap-1.5"
          >
            <Trash2 className="size-3.5" />
            Clear Models &amp; Reload
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
            className="text-xs gap-1.5"
          >
            <RefreshCw className="size-3.5" />
            Try Again
          </Button>
        </div>
      </div>
    </div>
  );
}

import { AlertTriangle, RefreshCw, Trash2 } from "lucide-react";
import { clearAppCacheAndReload } from "@/lib/pwaRecovery";

interface ErrorFallbackCardProps {
  errorMessage: string;
  onReset: () => void;
}

export function ErrorFallbackCard({
  errorMessage,
  onReset,
}: ErrorFallbackCardProps) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-background text-foreground font-sans">
      <div className="max-w-md w-full rounded-xl border border-border/80 bg-card p-6 shadow-lg text-center space-y-4">
        <div className="mx-auto size-12 rounded-full bg-destructive/10 text-destructive flex items-center justify-center">
          <AlertTriangle className="size-6" />
        </div>
        <div className="space-y-1.5">
          <h2 className="text-lg font-bold tracking-tight">
            Session Recovery Needed
          </h2>
          <p className="text-xs text-muted-foreground">
            A loading or runtime error occurred. This is commonly caused by an
            outdated browser cache or stale service worker after an update.
          </p>
        </div>
        <div className="rounded-lg bg-muted/50 p-2.5 text-left border border-border/60">
          <p className="text-[11px] font-mono text-muted-foreground break-words line-clamp-3">
            {errorMessage}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 pt-2">
          <button
            type="button"
            onClick={() => void clearAppCacheAndReload()}
            className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground shadow hover:bg-primary/90 transition-all active:scale-[0.98]"
          >
            <Trash2 className="size-3.5" />
            Clear Cache & Reload
          </button>
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-medium hover:bg-muted transition-all active:scale-[0.98]"
          >
            <RefreshCw className="size-3.5" />
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}

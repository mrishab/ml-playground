import { CleanupBannerStats } from "./CleanupBannerStats";
import { CleanupBannerActions } from "./CleanupBannerActions";

interface CleanupBannerProps {
  totalMissing: number;
  missingPercent: number;
  columnsWithMissing: number;
  duplicateCount: number;
  canUndo: boolean;
  onUndo: () => void;
  onReset: () => void;
}

export function CleanupBanner({
  totalMissing,
  missingPercent,
  columnsWithMissing,
  duplicateCount,
  canUndo,
  onUndo,
  onReset,
}: CleanupBannerProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-lg border border-border bg-card/60">
      <CleanupBannerStats
        totalMissing={totalMissing}
        missingPercent={missingPercent}
        columnsWithMissing={columnsWithMissing}
        duplicateCount={duplicateCount}
      />
      <CleanupBannerActions
        canUndo={canUndo}
        onUndo={onUndo}
        onReset={onReset}
      />
    </div>
  );
}

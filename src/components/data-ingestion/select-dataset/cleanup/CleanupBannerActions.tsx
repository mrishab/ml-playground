import { useState } from "react";
import { RotateCcw, Undo2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CleanupBannerActions({
  canUndo,
  onUndo,
  onReset,
}: {
  canUndo: boolean;
  onUndo: () => void;
  onReset: () => void;
}) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleResetClick = () => {
    if (!showConfirm) {
      setShowConfirm(true);
      setTimeout(() => setShowConfirm(false), 4000);
      return;
    }
    setShowConfirm(false);
    onReset();
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={onUndo}
        disabled={!canUndo}
        className="h-8 gap-1.5 text-xs transition-[transform,background-color,border-color,color] duration-150 ease-out active:scale-[0.98]"
      >
        <Undo2 className="h-3.5 w-3.5" />
        Undo
      </Button>
      <Button
        variant={showConfirm ? "destructive" : "ghost"}
        size="sm"
        onClick={handleResetClick}
        disabled={!canUndo}
        className="h-8 gap-1.5 text-xs transition-[transform,background-color,border-color,color] duration-150 ease-out active:scale-[0.98]"
      >
        {showConfirm ? (
          <>
            <AlertCircle className="h-3.5 w-3.5" />
            Confirm Reset All?
          </>
        ) : (
          <>
            <RotateCcw className="h-3.5 w-3.5" />
            Reset All
          </>
        )}
      </Button>
    </div>
  );
}

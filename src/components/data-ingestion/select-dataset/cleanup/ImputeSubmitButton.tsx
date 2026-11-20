import { Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ImputeSubmitButton({
  disabled,
  missingCount,
  onSubmit,
}: {
  disabled: boolean;
  missingCount: number;
  onSubmit: () => void;
}) {
  return (
    <Button
      onClick={onSubmit}
      disabled={disabled}
      className="w-full sm:w-auto h-9 gap-2 transition-[transform,background-color,border-color,color] duration-150 ease-out active:scale-[0.98]"
    >
      <Wand2 className="h-4 w-4" />
      Impute {missingCount > 0 ? `(${missingCount} nulls)` : ""}
    </Button>
  );
}

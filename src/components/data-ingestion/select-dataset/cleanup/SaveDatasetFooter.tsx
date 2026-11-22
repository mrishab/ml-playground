import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

export function SaveDatasetFooter({
  onClose,
  handleSave,
  disabled,
  isSaved,
}: {
  onClose: () => void;
  handleSave: () => void;
  disabled: boolean;
  isSaved: boolean;
}) {
  return (
    <DialogFooter className="flex sm:justify-between items-center gap-2">
      <Button variant="ghost" size="sm" onClick={onClose}>
        Cancel
      </Button>
      <Button
        size="sm"
        onClick={handleSave}
        disabled={disabled}
        className="gap-2 active:scale-[0.98]"
      >
        {isSaved ? (
          <>
            <Check className="h-4 w-4 text-success" /> Saved!
          </>
        ) : (
          "Save Dataset"
        )}
      </Button>
    </DialogFooter>
  );
}

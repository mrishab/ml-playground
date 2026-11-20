import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { SavedModel } from "@/types/savedModel";
import { RenameModelForm } from "./RenameModelForm";

interface RenameDialogProps {
  model: SavedModel | null;
  onClose: () => void;
  onConfirm: (id: string, newName: string) => void;
}

export function ModelRenameDialog({
  model,
  onClose,
  onConfirm,
}: RenameDialogProps) {
  return (
    <Dialog open={Boolean(model)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        {model && (
          <RenameModelForm
            key={model.id}
            model={model}
            onClose={onClose}
            onConfirm={onConfirm}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

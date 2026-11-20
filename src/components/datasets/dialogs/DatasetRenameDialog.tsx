import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { SavedDataset } from "@/types/savedDataset";
import { RenameDatasetForm } from "./RenameDatasetForm";

interface RenameDialogProps {
  dataset: SavedDataset | null;
  onClose: () => void;
  onConfirm: (id: string, newName: string) => void;
}

export function DatasetRenameDialog({
  dataset,
  onClose,
  onConfirm,
}: RenameDialogProps) {
  return (
    <Dialog open={Boolean(dataset)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        {dataset && (
          <RenameDatasetForm
            key={dataset.id}
            dataset={dataset}
            onClose={onClose}
            onConfirm={onConfirm}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

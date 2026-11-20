import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useModelImportReader } from "./useModelImportReader";
import { ModelImportDropzone } from "./ModelImportDropzone";

interface ImportDialogProps {
  open: boolean;
  onClose: () => void;
  onImport: (json: string) => number;
}

export function ModelImportDialog({
  open,
  onClose,
  onImport,
}: ImportDialogProps) {
  const { error, fileRef, handleFileChange } = useModelImportReader(
    onImport,
    onClose,
  );

  return (
    <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Import Model</DialogTitle>
          <DialogDescription>
            Select a previously exported model JSON file to restore it.
          </DialogDescription>
        </DialogHeader>
        <ModelImportDropzone fileRef={fileRef} onChange={handleFileChange} />
        {error && <p className="text-xs text-destructive">{error}</p>}
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

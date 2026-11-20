import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDatasetImportReader } from "./useDatasetImportReader";
import { DatasetImportDropzone } from "./DatasetImportDropzone";

interface ImportDialogProps {
  open: boolean;
  onClose: () => void;
  onImport: (json: string) => number;
}

export function DatasetImportDialog({
  open,
  onClose,
  onImport,
}: ImportDialogProps) {
  const { error, fileRef, handleFileChange } = useDatasetImportReader(
    onImport,
    onClose,
  );

  return (
    <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Import Dataset</DialogTitle>
          <DialogDescription>
            Select a previously exported dataset JSON bundle to restore it.
          </DialogDescription>
        </DialogHeader>
        <DatasetImportDropzone fileRef={fileRef} onChange={handleFileChange} />
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

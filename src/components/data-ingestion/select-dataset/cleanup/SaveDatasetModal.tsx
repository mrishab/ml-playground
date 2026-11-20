import { Database } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSaveDatasetModal } from "./useSaveDatasetModal";
import { SaveDatasetFormFields } from "./SaveDatasetFormFields";
import { SaveDatasetFooter } from "./SaveDatasetFooter";

interface SaveDatasetModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SaveDatasetModal({
  open,
  onOpenChange,
}: SaveDatasetModalProps) {
  const { name, setName, description, setDescription, isSaved, handleSave } =
    useSaveDatasetModal(() => onOpenChange(false));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-primary" />
            Save Dataset to Local Storage
          </DialogTitle>
          <DialogDescription>
            Store this cleaned dataset for future pipeline experiments
          </DialogDescription>
        </DialogHeader>
        <SaveDatasetFormFields
          name={name}
          setName={setName}
          description={description}
          setDescription={setDescription}
        />
        <SaveDatasetFooter
          onClose={() => onOpenChange(false)}
          handleSave={handleSave}
          disabled={!name.trim() || isSaved}
          isSaved={isSaved}
        />
      </DialogContent>
    </Dialog>
  );
}

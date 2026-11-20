import { useState } from "react";
import {
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { SavedModel } from "@/types/savedModel";

export function RenameModelForm({
  model,
  onClose,
  onConfirm,
}: {
  model: SavedModel;
  onClose: () => void;
  onConfirm: (id: string, newName: string) => void;
}) {
  const [name, setName] = useState(model.name);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onConfirm(model.id, name.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <DialogHeader>
        <DialogTitle>Rename Model</DialogTitle>
      </DialogHeader>
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter model name..."
      />
      <DialogFooter className="gap-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={!name.trim()}>
          Save Name
        </Button>
      </DialogFooter>
    </form>
  );
}

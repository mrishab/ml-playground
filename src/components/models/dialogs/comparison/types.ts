import type { SavedModel } from "@/types/savedModel";

export interface ModelComparisonDialogProps {
  open: boolean;
  onClose: () => void;
  models: SavedModel[];
}

export interface ComparisonSelectorsProps {
  models: SavedModel[];
  modelA?: SavedModel;
  modelB?: SavedModel;
  modelCId: string;
  onSelectA: (id: string) => void;
  onSelectB: (id: string) => void;
  onSelectC: (id: string) => void;
}

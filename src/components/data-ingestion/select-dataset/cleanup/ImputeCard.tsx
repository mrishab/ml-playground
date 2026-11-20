import { Wand2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ImputationStrategy, MissingSummary } from "@/types/dataCleanup";
import { useImputeForm } from "./useImputeForm";
import { ImputeFormFields } from "./ImputeFormFields";
import { ImputeSubmitButton } from "./ImputeSubmitButton";

interface ImputeCardProps {
  columns: string[];
  missingSummary: MissingSummary;
  onImpute: (col: string, strat: ImputationStrategy, val?: unknown) => void;
}

export function ImputeCard({
  columns,
  missingSummary,
  onImpute,
}: ImputeCardProps) {
  const form = useImputeForm(missingSummary, columns, onImpute);

  return (
    <Card className="border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Wand2 className="h-4 w-4 text-primary" />
          Impute Missing Values
        </CardTitle>
        <CardDescription>
          Fill null cells with statistical measures or constants
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ImputeFormFields
          columns={columns}
          missingSummary={missingSummary}
          selectedCol={form.selectedCol}
          onSelectCol={form.setSelectedCol}
          strategy={form.strategy}
          onStrategyChange={form.setStrategy}
          constantVal={form.constantVal}
          onConstantChange={form.setConstantVal}
        />
        <ImputeSubmitButton
          disabled={!form.selectedCol || form.currentMissing === 0}
          missingCount={form.currentMissing}
          onSubmit={form.handleSubmit}
        />
      </CardContent>
    </Card>
  );
}

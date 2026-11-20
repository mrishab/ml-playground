import { Layers } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { OutlierStrategy } from "@/types/dataCleanup";
import { useDuplicatesOutliersForm } from "./useDuplicatesOutliersForm";
import { OutliersSection } from "./OutliersSection";
import { DuplicatesSection } from "./DuplicatesSection";

interface DuplicatesOutliersCardProps {
  duplicateCount: number;
  numericColumns: string[];
  onRemoveDuplicates: () => void;
  onHandleOutliers: (col: string, strat: OutlierStrategy) => void;
}

export function DuplicatesOutliersCard({
  duplicateCount,
  numericColumns,
  onRemoveDuplicates,
  onHandleOutliers,
}: DuplicatesOutliersCardProps) {
  const form = useDuplicatesOutliersForm(
    numericColumns,
    onRemoveDuplicates,
    onHandleOutliers,
  );

  return (
    <Card className="border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Layers className="h-4 w-4 text-primary" />
          Duplicates &amp; Outliers
        </CardTitle>
        <CardDescription>
          De-duplicate identical rows and treat extreme values via IQR
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DuplicatesSection
          duplicateCount={duplicateCount}
          onRemoveDuplicates={form.onRemoveDuplicates}
        />
        <OutliersSection
          numericColumns={numericColumns}
          selectedCol={form.selectedCol}
          onSelectCol={form.setSelectedCol}
          strategy={form.strategy}
          onStrategyChange={form.setStrategy}
          onSubmit={form.handleOutlierSubmit}
        />
      </CardContent>
    </Card>
  );
}

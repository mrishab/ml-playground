import { Tabs } from "@/components/ui/tabs";
import { CleanupTabsList } from "./CleanupTabsList";
import { CleanupTransformTabs } from "./CleanupTransformTabs";
import { CleanupDataTabs } from "./CleanupDataTabs";
import type { useDataCleanup } from "./useDataCleanup";

interface CleanupTabsProps {
  cleanup: ReturnType<typeof useDataCleanup>;
}

export function CleanupTabs({ cleanup }: CleanupTabsProps) {
  return (
    <Tabs defaultValue="impute" className="w-full">
      <CleanupTabsList historyCount={cleanup.history.length} />
      <div className="pt-3">
        <CleanupTransformTabs cleanup={cleanup} />
        <CleanupDataTabs cleanup={cleanup} />
      </div>
    </Tabs>
  );
}

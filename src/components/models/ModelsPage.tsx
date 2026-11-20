import { useModelsPage } from "./useModelsPage";
import { ModelsPageContent } from "./ModelsPageContent";
import { ActionGateBar } from "@/components/pipeline/ActionGateBar";
import { ModelsErrorBoundary } from "./ModelsErrorBoundary";

export function ModelsPage() {
  const p = useModelsPage();

  return (
    <ModelsErrorBoundary>
      <div className="flex min-h-full flex-1 flex-col">
        <ModelsPageContent p={p} />
        <ActionGateBar
          primaryAction={{
            label: "Start New Pipeline",
            linkTo: "/data/select",
          }}
        />
      </div>
    </ModelsErrorBoundary>
  );
}

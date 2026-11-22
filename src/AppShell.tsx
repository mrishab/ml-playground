import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { SiteHeader } from "./components/site-header";
import { PipelineStepper } from "./components/pipeline/PipelineStepper";
import { PrerequisitesModal } from "./components/pipeline/PrerequisitesModal";
import { BugReportBubble } from "./components/feedback/BugReportBubble";
import { useDatasetStore } from "./stores/dataset";
import { useMLConfigStore } from "./stores/mlConfig";

export function AppShell() {
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      const hasDataset = Boolean(useDatasetStore.getState().df);
      const isSplit = useMLConfigStore.getState().isSplit;
      if (hasDataset || isSplit) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  return (
    <div className="flex h-[100dvh] min-h-[100dvh] w-full flex-col overflow-hidden bg-background">
      <SiteHeader />
      <PipelineStepper />
      <main className="flex-1 overflow-y-auto bg-background flex flex-col overscroll-contain pb-32 sm:pb-36">
        <Outlet />
      </main>
      <PrerequisitesModal />
      <BugReportBubble />
    </div>
  );
}

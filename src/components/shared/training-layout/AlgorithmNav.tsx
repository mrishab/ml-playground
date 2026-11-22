import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useMLConfigStore } from "@/stores/mlConfig";
import { ALGORITHMS } from "./algorithmNavData";

export function AlgorithmNav() {
  const { pathname } = useLocation();
  const problemType = useMLConfigStore((s) => s.problemType);

  return (
    <div className="w-full overflow-x-auto no-scrollbar pb-1">
      <div className="flex items-center gap-1.5 p-1 bg-muted/40 rounded-lg border border-border/60 min-w-max">
        {ALGORITHMS.map(({ path, label, icon: Icon, task }) => {
          const isActive = pathname === path;
          const isIncompatible =
            (problemType === "classification" && task === "regression") ||
            (problemType === "regression" && task === "classification");

          const tooltip = isIncompatible
            ? task === "regression"
              ? "Requires regression target. Current task is classification."
              : "Requires categorical target. Current task is regression."
            : undefined;

          if (isIncompatible) {
            return (
              <span
                key={path}
                title={tooltip}
                aria-disabled="true"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-muted-foreground/35 cursor-not-allowed select-none border border-transparent"
              >
                <Icon className="h-3.5 w-3.5 opacity-30" />
                <span>{label}</span>
              </span>
            );
          }

          return (
            <Link
              key={path}
              to={path}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-[background-color,color,box-shadow] duration-150 ease-out",
                isActive
                  ? "bg-background text-foreground shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground hover:bg-background/50",
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

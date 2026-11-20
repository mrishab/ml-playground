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

          return (
            <Link
              key={path}
              to={path}
              title={
                isIncompatible
                  ? `Incompatible with ${problemType} task`
                  : undefined
              }
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-150 ease-out",
                isActive
                  ? "bg-background text-foreground shadow-xs font-semibold"
                  : isIncompatible
                    ? "text-muted-foreground/40 hover:text-muted-foreground hover:bg-background/30 line-through decoration-muted-foreground/40"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/50",
              )}
            >
              <Icon
                className={cn("h-3.5 w-3.5", isIncompatible && "opacity-40")}
              />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

import {
  TrendingUp,
  Users,
  Layers,
  Binary,
  CircleDot,
  Trees,
  Zap,
  ShieldAlert,
} from "lucide-react";

export type AlgTask = "regression" | "classification" | "both" | "unsupervised";

export interface NavAlg {
  path: string;
  label: string;
  icon: typeof TrendingUp;
  task: AlgTask;
}

export const ALGORITHMS: NavAlg[] = [
  {
    path: "/train/linear",
    label: "Linear Reg",
    icon: TrendingUp,
    task: "regression",
  },
  { path: "/train/knn", label: "KNN", icon: Users, task: "both" },
  {
    path: "/train/logistic",
    label: "Logistic",
    icon: Binary,
    task: "classification",
  },
  { path: "/train/lda", label: "LDA", icon: Layers, task: "classification" },
  {
    path: "/train/clustering",
    label: "K-Means",
    icon: CircleDot,
    task: "unsupervised",
  },
  {
    path: "/train/random-forest",
    label: "Random Forest",
    icon: Trees,
    task: "both",
  },
  { path: "/train/xgboost", label: "XGBoost", icon: Zap, task: "both" },
  {
    path: "/train/isolation-forest",
    label: "Iso Forest",
    icon: ShieldAlert,
    task: "unsupervised",
  },
];

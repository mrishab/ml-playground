import {
  TrendingUp,
  Users,
  Layers,
  Binary,
  CircleDot,
  Trees,
  Zap,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import type { AlgorithmType } from "@/types/savedModel";

export const ALGO_ICONS: Record<AlgorithmType, typeof TrendingUp> = {
  linear: TrendingUp,
  knn: Users,
  lda: Layers,
  logistic: Binary,
  clustering: CircleDot,
  "random-forest": Trees,
  xgboost: Zap,
  "isolation-forest": ShieldAlert,
  pca: Sparkles,
};

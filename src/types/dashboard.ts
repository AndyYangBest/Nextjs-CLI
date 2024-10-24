// types/dashboard.ts
import { type ReactNode } from "react";

export interface DashboardItem {
  id: string;
  title: string;
  component: ReactNode;
  defaultSize?: {
    w: number;
    h: number;
  };
  data?: any;
}

export interface SavedDashboard {
  id: string;
  name: string;
  timestamp: number;
  items: DashboardItem[];
  layout: Layout;
}

export type Layout = Array<{
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
}>;

export interface DashboardContextType {
  currentDashboard: SavedDashboard | null;
  dashboardHistory: SavedDashboard[];
  generateNewDashboard: () => void;
  saveDashboard: (name: string) => void;
  loadDashboard: (id: string) => void;
  updateCurrentLayout: (layout: Layout) => void;
}

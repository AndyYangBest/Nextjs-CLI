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

// 基础图表配置
export interface ChartConfig {
  component: React.ComponentType<any>;
  title: string;
  size: [number, number]; // [width, height]
  defaultData?: any;
}

// 图表注册表类型
export type ChartRegistry = {
  [K: string]: ChartConfig;
};

// 布局项
export interface LayoutItem {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

// 仪表板项
export interface DashboardItem {
  id: string;
  title: string;
  component: ReactNode;
  defaultSize?: {
    w: number;
    h: number;
  };
}

// 布局配置
export interface LayoutConfig {
  charts: string[];
  layout: LayoutItem[];
}

// 保存的仪表板配置
export interface SavedDashboard extends LayoutConfig {
  id: string;
  title?: string;
  created: number;
}

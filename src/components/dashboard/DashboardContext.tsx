import React, { createContext, useContext, useState, useEffect } from "react";
import { generateRandomData } from "@/lib/data-generator";
import {
  type DashboardContextType,
  type SavedDashboard,
  type Layout,
} from "@/types/dashboard";
import { defaultWidgets } from "./DashboardWidgets";

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

const DEFAULT_DASHBOARD: SavedDashboard = {
  id: "default",
  name: "Default Dashboard",
  timestamp: Date.now(),
  items: defaultWidgets,
  layout: defaultWidgets.map((widget) => ({
    i: widget.id,
    x: 0,
    y: 0,
    w: widget.defaultSize?.w ?? 6,
    h: widget.defaultSize?.h ?? 4,
  })),
};

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [currentDashboard, setCurrentDashboard] =
    useState<SavedDashboard | null>(null);
  const [dashboardHistory, setDashboardHistory] = useState<SavedDashboard[]>(
    []
  );

  const generateNewDashboard = () => {
    const widgets = defaultWidgets.map((widget) => ({
      ...widget,
      data: generateRandomData(widget.id),
    }));

    const layout = widgets.map((widget, i) => ({
      i: widget.id,
      x: (i * 4) % 12,
      y: Math.floor(i / 3) * 4,
      w: widget.defaultSize?.w ?? 4,
      h: widget.defaultSize?.h ?? 4,
    }));

    const newDashboard = {
      id: Date.now().toString(),
      name: "New Dashboard",
      timestamp: Date.now(),
      items: widgets,
      layout,
    };

    setCurrentDashboard(newDashboard);
  };

  const saveDashboard = (name: string) => {
    if (!currentDashboard) return;

    const savedDashboard = {
      ...currentDashboard,
      id: Date.now().toString(),
      name,
      timestamp: Date.now(),
    };

    const updatedHistory = [savedDashboard, ...dashboardHistory];
    setDashboardHistory(updatedHistory);
    localStorage.setItem("dashboardHistory", JSON.stringify(updatedHistory));
  };

  const loadDashboard = (id: string) => {
    const dashboard =
      dashboardHistory.find((d) => d.id === id) ?? DEFAULT_DASHBOARD;
    setCurrentDashboard(dashboard);
  };

  const updateCurrentLayout = (newLayout: Layout) => {
    if (!currentDashboard) return;

    const updatedDashboard = {
      ...currentDashboard,
      layout: newLayout,
    };
    setCurrentDashboard(updatedDashboard);

    const updatedHistory = dashboardHistory.map((dash) =>
      dash.id === currentDashboard.id ? updatedDashboard : dash
    );
    setDashboardHistory(updatedHistory);
  };

  // Load saved dashboards from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("dashboardHistory");
    if (savedHistory) {
      setDashboardHistory(JSON.parse(savedHistory));
    }
    generateNewDashboard(); // Generate initial dashboard
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        currentDashboard,
        dashboardHistory,
        generateNewDashboard,
        saveDashboard,
        loadDashboard,
        updateCurrentLayout,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
}

import React from "react";
import { useDashboard } from "./DashboardContext";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from "date-fns";

export function DashboardHistoryNav() {
  const { dashboardHistory, loadDashboard, currentDashboard } = useDashboard();

  if (!dashboardHistory.length) return null;

  return (
    <ScrollArea className="h-[300px] w-full">
      <div className="p-2">
        <h4 className="mb-4 text-sm font-semibold">Saved Dashboards</h4>
        {dashboardHistory.map((dashboard) => (
          <Button
            key={dashboard.id}
            variant={
              currentDashboard?.id === dashboard.id ? "secondary" : "ghost"
            }
            onClick={() => loadDashboard(dashboard.id)}
            className="mb-2 w-full justify-start"
          >
            <div className="flex flex-col items-start">
              <span className="font-medium">{dashboard.name}</span>
              <span className="text-xs text-muted-foreground">
                {formatDistanceToNow(dashboard.timestamp, { addSuffix: true })}
              </span>
            </div>
          </Button>
        ))}
      </div>
    </ScrollArea>
  );
}

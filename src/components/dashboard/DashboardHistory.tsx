import React from "react";
import { useDashboard } from "@/components/dashboard/DashboardContext";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from "date-fns";

export const DashboardHistory: React.FC = () => {
  const {
    dashboardHistory,
    loadDashboard,
    currentDashboard,
    generateNewDashboard,
  } = useDashboard();

  return (
    <ScrollArea className="h-[300px] w-full rounded-md border">
      <div className="p-4">
        <Button className="mb-4 w-full" onClick={generateNewDashboard}>
          Generate New Dashboard
        </Button>

        <h4 className="mb-4 text-sm font-medium">Saved Dashboards</h4>

        {dashboardHistory.map((dashboard) => (
          <Button
            key={dashboard.id}
            variant={
              currentDashboard?.id === dashboard.id ? "secondary" : "ghost"
            }
            className="mb-2 w-full justify-start"
            onClick={() => loadDashboard(dashboard.id)}
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
};

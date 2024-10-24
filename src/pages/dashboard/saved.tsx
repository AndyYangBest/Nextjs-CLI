import React from "react";
import { useRouter } from "next/router";
import { useDashboard } from "@/components/dashboard/DashboardContext";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/common/heading";
import { formatDistanceToNow } from "date-fns";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function SavedDashboards() {
  const router = useRouter();
  const { dashboardHistory, loadDashboard } = useDashboard();

  const handleDashboardSelect = (id: string) => {
    loadDashboard(id);
    void router.push("/dashboard");
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <Heading
          title="Saved Dashboards"
          description="View and load your saved dashboard layouts"
        />
        <Button onClick={() => void router.push("/dashboard")}>
          Return to Dashboard
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {dashboardHistory.map((dashboard) => (
          <Card
            key={dashboard.id}
            className="cursor-pointer hover:bg-accent"
            onClick={() => handleDashboardSelect(dashboard.id)}
          >
            <CardHeader>
              <CardTitle>{dashboard.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Saved{" "}
                {formatDistanceToNow(dashboard.timestamp, { addSuffix: true })}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
